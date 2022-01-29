using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using System;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class HttpProxier : IHttpProxier
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly HttpRequestMapper _requestMapper;
        private readonly HttpResponseMapper _responseMapper;
        private readonly IDataAccess _dataAccess;

        public HttpProxier(
            IHttpClientFactory httpClientFactory,
            HttpRequestMapper requestMapper,
            HttpResponseMapper responseMapper,
            IDataAccess dataAccess)
        {
            _httpClientFactory = httpClientFactory;
            _requestMapper = requestMapper;
            _responseMapper = responseMapper;
            _dataAccess = dataAccess;
        }

        public async Task ProxyAsync(HttpContext context)
        {
            // Log entry for the access log, this gets built out as info is available.
            var requestLog = new Request();
            requestLog.Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            requestLog.RequestMethod = context.Request.Method;
            // requestLog.Url = UriHelper.GetDisplayUrl(context.Request);
            requestLog.RequestHeaders = JsonSerializer.Serialize(context.Request.Headers);
            var originalResponseBodySteam = context.Response.Body;
            using MemoryStream requestStream = new MemoryStream();
            using MemoryStream responseStream = new MemoryStream();
            await context.Request.Body.CopyToAsync(requestStream);
            context.Request.Body = requestStream;
            requestLog.RequestBody = Encoding.UTF8.GetString(requestStream.ToArray());
            context.Response.Body = responseStream;                                                
            context.Request.Body.Seek(0, SeekOrigin.Begin);
            var client = _httpClientFactory.CreateClient("proxy");
            var clientRequest = _requestMapper.Map(context.Request);
            requestLog.Url = clientRequest.RequestUri.AbsoluteUri.ToString();
            await _responseMapper.MapAsync(context.Response, await client.SendAsync(clientRequest));
            requestLog.ResponseStatus = context.Response.StatusCode;
            requestLog.ResponseHeaders = JsonSerializer.Serialize(context.Response.Headers);            
            context.Response.Body.Seek(0, SeekOrigin.Begin);
            using MemoryStream data = new MemoryStream();
            await context.Response.Body.CopyToAsync(data);
            requestLog.ResponseBody = Encoding.UTF8.GetString(data.ToArray());
            context.Response.Body.Seek(0, SeekOrigin.Begin);
            await context.Response.Body.CopyToAsync(originalResponseBodySteam);
            context.Response.Body = originalResponseBodySteam;
            await _dataAccess.AddRequestAsync(requestLog);
        }
    }
}
