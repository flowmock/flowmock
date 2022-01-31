using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using LazyCache;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class HttpRequestMapper
    {
        private readonly string[] _excludedHeaders = new string[] { "Host" };
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;

        public HttpRequestMapper(IDataAccess dataAccess, IAppCache appCache)
        {
            _dataAccess = dataAccess;
            _appCache = appCache;
        }

        public async Task<HttpRequestMessage> MapAsync(HttpRequest request)
        {
            HttpMethod httpMethod = HttpMethod.Get;

            switch (request.Method)
            {
                case "GET":
                    httpMethod = HttpMethod.Get;
                    break;
                case "POST":
                    httpMethod = HttpMethod.Post;
                    break;
                case "PUT":
                    httpMethod = HttpMethod.Put;
                    break;
                case "HEAD":
                    httpMethod = HttpMethod.Head;
                    break;
                case "PATCH":
                    httpMethod = HttpMethod.Patch;
                    break;
                case "OPTIONS":
                    httpMethod = HttpMethod.Options;
                    break;
            }

            var settings = await _appCache.GetOrAddAsync("settings", async () =>
            {
                return (await _dataAccess.GetAllSettingsAsync()).ToList();
            });

            var proxyBasePath = settings.FirstOrDefault(setting => setting.Key == "Proxy Base Path").Value;

            var proxyMappings = await _appCache.GetOrAddAsync("proxyMappings", async () =>
            {
                return (await _dataAccess.GetAllProxyMappingsAsync()).ToList();
            });

            string proxyEndpoint = null;

            foreach (ProxyMapping proxyMapping in proxyMappings)
            {
                if (request.Path.StartsWithSegments(AddPathSeperator(proxyBasePath) + proxyMapping.BasePath))
                {
                    proxyEndpoint = AddPathSeperator(proxyMapping.ProxyToBaseUrl) + request.Path.Value.Replace(AddPathSeperator(proxyBasePath) + proxyMapping.BasePath, "") + request.QueryString;
                    break;
                }
            }

            if (proxyEndpoint == null)
            {
                throw new KeyNotFoundException("Unable to proxy request, no mappings found.");
            }

            var httpRequestMessage = new HttpRequestMessage(httpMethod, proxyEndpoint);
            httpRequestMessage.Content = new StreamContent(request.Body);

            foreach (var header in request.Headers)
            {
                if (_excludedHeaders.Any(x => x == header.Key))
                {
                    continue;
                }

                // Try to add to the request header, if not successful, add it to the content header.
                if (!httpRequestMessage.Headers.TryAddWithoutValidation(header.Key, (IEnumerable<string>)header.Value))
                {
                    httpRequestMessage.Content.Headers.TryAddWithoutValidation(header.Key, (IEnumerable<string>)header.Value);
                }
            }

            return httpRequestMessage;
        }

        private static string AddPathSeperator(string path)
        {
            return path.EndsWith("/") ? path : path + "/";
        }
    }
}