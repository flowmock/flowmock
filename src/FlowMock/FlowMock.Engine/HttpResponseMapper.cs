using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class HttpResponseMapper
    {
        public async Task MapAsync(HttpResponse proxyResponse, HttpResponseMessage endpointResponse)
        {
            foreach (var header in endpointResponse.Headers)
            {
                if (header.Key == "Transfer-Encoding" && header.Value.Contains("chunked")) { continue; }

                proxyResponse.Headers.Add(header.Key, new StringValues(header.Value.ToArray()));
            }

            foreach (var header in endpointResponse.Content.Headers)
            {
                proxyResponse.Headers.Add(header.Key, new StringValues(header.Value.ToArray()));
            }

            proxyResponse.StatusCode = (int)endpointResponse.StatusCode;

            await (await endpointResponse.Content.ReadAsStreamAsync()).CopyToAsync(proxyResponse.Body);
        }
    }
}
