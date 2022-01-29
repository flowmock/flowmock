using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class HttpProxierMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHttpProxier _httpProxier;

        public HttpProxierMiddleware(RequestDelegate next, IHttpProxier httpProxier)
        {
            _next = next;
            _httpProxier = httpProxier;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Request.Path.StartsWithSegments("/proxy"))
            {
                await _next(context);
                return;
            }

            await _httpProxier.ProxyAsync(context);
        }
    }
}
