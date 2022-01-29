using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace FlowMock.Engine
{
    public class HttpRequestMapper
    {
        private readonly string[] _excludedHeaders = new string[] { "Host" };
        private readonly string _baseUrl;

        public HttpRequestMapper(string baseUrl)
        {
            _baseUrl = baseUrl;
        }

        public HttpRequestMessage Map(HttpRequest request)
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

            var proxyEndpoint = _baseUrl + request.Path.Value.Replace("/proxy/chucknorris", "") + request.QueryString;

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
    }
}