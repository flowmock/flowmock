using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using FlowMock.Engine.Models.Trigger;
using LazyCache;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class HttpMocker : IHttpMocker
    {
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;

        public HttpMocker(IDataAccess dataAccess, IAppCache appCache)
        {
            _dataAccess = dataAccess;
            _appCache = appCache;
        }

        public async Task ProxyAsync(HttpContext context, Mock mock)
        {
            var responseHeaders = JsonSerializer.Deserialize<IEnumerable<MockParameter>>(mock.ResponseHeaders);

            foreach (var header in responseHeaders)
            {
                context.Response.Headers.Add(header.Name, new StringValues(header.Value.Split(";").ToArray()));
            }

            context.Response.StatusCode = mock.ResponseStatus;

            await (new MemoryStream(Encoding.UTF8.GetBytes(mock.ResponseBody ?? ""))).CopyToAsync(context.Response.Body);
        }

        public async Task<Mock> ShouldHandleAsync(HttpContext context)
        {
            var mocks = await _dataAccess.GetAllMocksAsync();

            foreach(var mock in mocks)
            {
                var trigger = JsonSerializer.Deserialize<TriggerBody>(mock.Trigger);

                Dictionary<string, string> mockState = new Dictionary<string, string>();
                var mockParameters = JsonSerializer.Deserialize<IEnumerable<MockParameter>>(mock.Parameters);
                foreach (var param in mockParameters) {
                    mockState.Add(param.Name, param.Value);
                }

                var startNode = new StartNode();

                // First find the gotRequest element.
                var startElement = trigger.Elements.FirstOrDefault((element) => element.Type == "gotRequest");

                // Use the id to find the connection.
                var startElementConnection = trigger.Elements.FirstOrDefault(element => element.Source == startElement.Id);

                // Get the target element.
                var targetElement = trigger.Elements.FirstOrDefault(element => element.Id == startElementConnection.Target);

                if(targetElement.Type == "requestHeader")
                {
                    RequestHeaderData headerData = JsonSerializer.Deserialize<RequestHeaderData>(targetElement.Data);

                    foreach (var nameOpValue in headerData.Headers)
                    {
                        var header =  context.Request.Headers.FirstOrDefault(h => h.Key == nameOpValue.Name);

                        if (header.Equals(default(KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>)))
                        {
                            return null;
                        }

                        var value = nameOpValue.Value;
                        foreach (var envVar in mockState)
                        {
                            value = value.Replace("{{" + envVar.Key + "}}", envVar.Value);
                        }

                        if(nameOpValue.Op == "equals" && header.Value == value)
                        {

                            // Use the id to find the connection.
                            var nextConnection = trigger.Elements.FirstOrDefault(element => element.Source == targetElement.Id);
                            var nextTarget = trigger.Elements.FirstOrDefault(element => element.Id == nextConnection.Target);

                            if(nextTarget.Type == "returnMockResponse")
                            {
                                return mock;
                            }
                        }
                    }                            
                }

                startNode.ExecOut = trigger.Elements.FirstOrDefault((element) => element.Type == "gotRequest");

                return null;
            }

            return null;
        }
    }
}
