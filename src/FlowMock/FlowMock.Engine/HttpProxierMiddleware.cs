using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using LazyCache;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class HttpProxierMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHttpProxier _httpProxier;
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;

        public HttpProxierMiddleware(RequestDelegate next, IHttpProxier httpProxier, IDataAccess dataAccess, IAppCache appCache)
        {
            _next = next;
            _httpProxier = httpProxier;
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

            await _httpProxier.ProxyAsync(context);
        }
    }
}
