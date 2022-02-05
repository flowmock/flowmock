using FlowMock.Engine.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public interface IHttpMocker
    {
        Task<Mock> ShouldHandleAsync(HttpContext context);

        Task ProxyAsync(HttpContext context, Mock mock);
    }
}
