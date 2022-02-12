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

        public async Task HandleAsync(ProxyContext context)
        {
            context.Request.Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            context.Request.RequestMethod = context.HttpContext.Request.Method;
            // requestLog.Url = UriHelper.GetDisplayUrl(context.Request);
            context.Request.RequestHeaders = JsonSerializer.Serialize(context.HttpContext.Request.Headers);
            var originalResponseBodySteam = context.HttpContext.Response.Body;
            using MemoryStream requestStream = new MemoryStream();
            using MemoryStream responseStream = new MemoryStream();
            await context.HttpContext.Request.Body.CopyToAsync(requestStream);
            context.HttpContext.Request.Body = requestStream;
            context.Request.RequestBody = Encoding.UTF8.GetString(requestStream.ToArray());
            context.HttpContext.Response.Body = responseStream;                                                
            context.HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);
            var client = _httpClientFactory.CreateClient("proxy");
            var clientRequest = await _requestMapper.MapAsync(context.HttpContext.Request);
            context.Request.Url = clientRequest.RequestUri.AbsoluteUri.ToString();
            await _responseMapper.MapAsync(context.HttpContext.Response, await client.SendAsync(clientRequest));
            context.Request.ResponseStatus = context.HttpContext.Response.StatusCode;
            context.Request.ResponseHeaders = JsonSerializer.Serialize(context.HttpContext.Response.Headers);            
            context.HttpContext.Response.Body.Seek(0, SeekOrigin.Begin);
            using MemoryStream data = new MemoryStream();
            await context.HttpContext.Response.Body.CopyToAsync(data);
            context.Request.ResponseBody = Encoding.UTF8.GetString(data.ToArray());
            context.HttpContext.Response.Body.Seek(0, SeekOrigin.Begin);
            await context.HttpContext.Response.Body.CopyToAsync(originalResponseBodySteam);
            context.HttpContext.Response.Body = originalResponseBodySteam;
        }
    }
}
