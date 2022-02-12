using FlowMock.Engine.Data;
using FlowMock.Engine.Models;
using FlowMock.Engine.Models.Rules;
using FlowMock.Engine.Models.Rules.Nodes;
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
using System.Threading.Tasks;

namespace FlowMock.Engine
{
    public class HttpMocker : IHttpMocker
    {
        private readonly IDataAccess _dataAccess;
        private readonly IAppCache _appCache;
        private readonly HttpRequestMapper _requestMapper;

        public HttpMocker(IDataAccess dataAccess, IAppCache appCache, HttpRequestMapper requestMapper)
        {
            _dataAccess = dataAccess;
            _appCache = appCache;
            _requestMapper = requestMapper;
        }

        public async Task HandleAsync(Mock mock, MockContext context)
        {
            // Log entry for the access log, this gets built out as info is available.
            context.Request.Timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            context.Request.RequestMethod = context.HttpContext.Request.Method;
            // requestLog.Url = UriHelper.GetDisplayUrl(context.Request);
            context.Request.RequestHeaders = JsonSerializer.Serialize(context.HttpContext.Request.Headers);
            using MemoryStream requestStream = new MemoryStream();
            await context.HttpContext.Request.Body.CopyToAsync(requestStream);
            context.HttpContext.Request.Body = requestStream;
            context.Request.RequestBody = Encoding.UTF8.GetString(requestStream.ToArray());
            context.HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);

            var responseHeaders = JsonSerializer.Deserialize<IEnumerable<MockParameter>>(mock.ResponseHeaders);

            foreach (var header in responseHeaders)
            {
                context.HttpContext.Response.Headers.Add(header.Name, new StringValues(header.Value.Split(";").ToArray()));
            }

            var clientRequest = await _requestMapper.MapAsync(context.HttpContext.Request);
            context.Request.Url = clientRequest.RequestUri.AbsoluteUri.ToString();
            context.Request.ResponseStatus = mock.ResponseStatus;
            context.HttpContext.Response.StatusCode = mock.ResponseStatus;
            context.Request.ResponseHeaders = JsonSerializer.Serialize(context.HttpContext.Response.Headers);
            context.Request.ResponseBody = mock.ResponseBody;
            await (new MemoryStream(Encoding.UTF8.GetBytes(mock.ResponseBody ?? ""))).CopyToAsync(context.HttpContext.Response.Body);
            context.Request.MockId = mock.Id;
        }

        public async Task<(Mock, MockContext)> ShouldHandleAsync(HttpContext context)
        {
            var mocks = await _dataAccess.GetAllMocksAsync(new FilterAndProjectionQuery() { Limit = int.MaxValue });

            foreach (var mock in mocks)
            {
                var trigger = JsonSerializer.Deserialize<TriggerBody>(mock.Trigger);

                Dictionary<string, string> mockState = new Dictionary<string, string>();

                var mockContext = new MockContext()
                {
                    HttpContext = context,
                    MockState = mockState,
                    RequestMapper = _requestMapper,
                };

                // Setup the initial state with the mock parameters.
                var mockParameters = JsonSerializer.Deserialize<IEnumerable<MockParameter>>(mock.Parameters);
                foreach (var param in mockParameters) {
                    mockState.Add(param.Name, param.Value);
                }

                List<INode> nodes = new List<INode>();
                NodeFactory nodeFactory = new NodeFactory();

                if (trigger?.Elements == null) { return (null, mockContext);  }

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

                    if(sourceNode == null || targetNode == null)
                    {
                        // connection isn't complete.
                        continue;
                    }

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
                    currentNode = await currentNode.GetNextNodeAsync(mockContext);
                }

                if (currentNode is ReturnMockResponseNode)
                {
                    return (mock, mockContext);
                }
                else
                {
                    return (null, mockContext);
                }
            }

            return (null, null);
        }
    }
}
