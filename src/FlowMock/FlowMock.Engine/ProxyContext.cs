using FlowMock.Engine.Models;
using Microsoft.AspNetCore.Http;

namespace FlowMock.Engine
{
    public class ProxyContext
    {
        public Request Request { get; internal set; }
        public HttpContext HttpContext { get; internal set; }
    }
}
