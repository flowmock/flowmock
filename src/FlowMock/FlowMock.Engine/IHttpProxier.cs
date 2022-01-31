using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public interface IHttpProxier
    {
        Task ProxyAsync(HttpContext context);
    }
}
