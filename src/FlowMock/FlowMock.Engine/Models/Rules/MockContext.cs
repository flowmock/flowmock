using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlowMock.Engine.Models.Rules
{
    public class MockContext
    {
        public HttpContext HttpContext { get; internal set; }
        public Dictionary<string, string> MockState { get; internal set; }
    }
}
