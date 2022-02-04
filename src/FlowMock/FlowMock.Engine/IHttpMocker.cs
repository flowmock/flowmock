using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public interface IHttpMocker
    {
        Task<bool> ShouldHandleAsync(HttpContext context);

        Task ProxyAsync(HttpContext context);        
    }
}
