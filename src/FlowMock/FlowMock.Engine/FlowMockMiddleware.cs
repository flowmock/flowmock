using FlowMock.Engine.Data;
using LazyCache;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class FlowMockMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHttpProxier _httpProxier;
        private readonly IHttpMocker _httpMocker;
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;

        public FlowMockMiddleware(RequestDelegate next, IHttpProxier httpProxier, IHttpMocker httpMocker, IDataAccess dataAccess, IAppCache appCache)
        {
            _next = next;
            _httpProxier = httpProxier;
            _httpMocker = httpMocker;
            _dataAccess = dataAccess;
            _appCache = appCache;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var settings = await _appCache.GetOrAddAsync("settings", async () =>
            {
                return (await _dataAccess.GetAllSettingsAsync()).ToList();
            });

            var proxyBasePath = settings.FirstOrDefault(setting => setting.Key == "Proxy Base Path").Value;

            if (!context.Request.Path.StartsWithSegments(proxyBasePath))
            {
                await _next(context);
                return;
            }

            var mock = await _httpMocker.ShouldHandleAsync(context);
            if(mock != null)
            {
                await _httpMocker.HandleAsync(context, mock);
            }
            else
            {
                await _httpProxier.HandleAsync(context);
            }
        }
    }
}
