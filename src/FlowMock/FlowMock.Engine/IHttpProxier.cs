using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public interface IHttpProxier
    {
        Task HandleAsync(ProxyContext context);
    }
}
