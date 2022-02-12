using FlowMock.Engine.Models;
using FlowMock.Engine.Models.Rules;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public interface IHttpMocker
    {
        Task<(Mock, MockContext)> ShouldHandleAsync(HttpContext context);

        Task HandleAsync(Mock mock, MockContext context);
    }
}
