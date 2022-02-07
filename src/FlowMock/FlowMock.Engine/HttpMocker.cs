using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using FlowMock.Engine.Models.Rules;
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

        public async Task HandleAsync(HttpContext context, Mock mock)
        {
            // Log entry for the access log, this gets built out as info is available.
            var requestLog = new Request();
            requestLog.Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            requestLog.RequestMethod = context.Request.Method;
            // requestLog.Url = UriHelper.GetDisplayUrl(context.Request);
            requestLog.RequestHeaders = JsonSerializer.Serialize(context.Request.Headers);
            using MemoryStream requestStream = new MemoryStream();
            await context.Request.Body.CopyToAsync(requestStream);
            context.Request.Body = requestStream;
            requestLog.RequestBody = Encoding.UTF8.GetString(requestStream.ToArray());
            context.Request.Body.Seek(0, SeekOrigin.Begin);

            var responseHeaders = JsonSerializer.Deserialize<IEnumerable<MockParameter>>(mock.ResponseHeaders);

            foreach (var header in responseHeaders)
            {
                context.Response.Headers.Add(header.Name, new StringValues(header.Value.Split(";").ToArray()));
            }

            requestLog.ResponseStatus = mock.ResponseStatus;
            context.Response.StatusCode = mock.ResponseStatus;
            requestLog.ResponseHeaders = JsonSerializer.Serialize(context.Response.Headers);
            requestLog.ResponseBody = mock.ResponseBody;
            await (new MemoryStream(Encoding.UTF8.GetBytes(mock.ResponseBody ?? ""))).CopyToAsync(context.Response.Body);
            requestLog.MockId = mock.Id;
            await _dataAccess.AddRequestAsync(requestLog);
        }

        public async Task<Mock> ShouldHandleAsync(HttpContext context)
        {
            var mocks = await _dataAccess.GetAllMocksAsync();

            foreach (var mock in mocks)
            {
                var trigger = JsonSerializer.Deserialize<TriggerBody>(mock.Trigger);

                Dictionary<string, string> mockState = new Dictionary<string, string>();
                var mockParameters = JsonSerializer.Deserialize<IEnumerable<MockParameter>>(mock.Parameters);
                foreach (var param in mockParameters) {
                    mockState.Add(param.Name, param.Value);
                }

                List<INode> nodes = new List<INode>();
                NodeFactory nodeFactory = new NodeFactory();

                if (trigger?.Elements == null) { return null;  }

                foreach (var element in trigger.Elements)
                {
                    var node = nodeFactory.GetNode(element);
                    if (node != null)
                    {
                        nodes.Add(node);
                    }
                }

                foreach (var element in trigger.Elements)
                {
                    if (element.Source == null || element.Target == null)
                    {
                        // not a connection.
                        continue;
                    }

                    var sourceNode = nodes.FirstOrDefault(node => node.Id == element.Source);
                    var targetNode = nodes.FirstOrDefault(node => node.Id == element.Target);

                    var sourceConnector = sourceNode.Connectors.FirstOrDefault(connector => connector.Id == element.SourceHandle);
                    var targetConnector = targetNode.Connectors.FirstOrDefault(connector => connector.Id == element.TargetHandle);

                    if (sourceConnector == null)
                    {
                        sourceConnector = new Connector { Node = sourceNode, Id = element.SourceHandle };
                        sourceNode.Connectors.Add(sourceConnector);
                    }

                    if (targetConnector == null)
                    {
                        targetConnector = new Connector { Node = targetNode, Id = element.TargetHandle };
                        targetNode.Connectors.Add(targetConnector);
                    }

                    sourceConnector.Connection = targetConnector;
                    targetConnector.Connection = sourceConnector;
                }

                // First find the gotRequest element.
                var currentNode = nodes.FirstOrDefault(node => node is GotRequestEventNode);

                while (!(currentNode is ReturnMockResponseNode || currentNode is ReturnProxyResponseNode || currentNode is DeadEndNode))
                {
                    currentNode = await currentNode.GetNextNodeAsync(new Context()
                    {
                        HttpContext = context,
                        MockState = mockState
                    });
                }

                if (currentNode is ReturnMockResponseNode)
                {
                    return mock;
                }
                else
                {
                    return null;
                }
            }

            return null;
        }
    }
}
