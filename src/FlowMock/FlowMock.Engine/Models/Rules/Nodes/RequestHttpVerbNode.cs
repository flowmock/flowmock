using FlowMock.Engine.Models.Trigger;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules.Nodes
{
    public class HttpMethodData
    {
        [JsonPropertyName("method")]
        public string Method { get; set; }
    }

    [NodeType("requestHttpMethod")]
    public class RequestHttpMethodNode : NodeBase
    {
        HttpMethodData _data;

        public RequestHttpMethodNode(Element element) : base(element)
        {
            _data = JsonSerializer.Deserialize<HttpMethodData>(element.Data);
        }

        public override async Task<INode> GetNextNodeAsync(MockContext context)
        {
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            MemoryStream requestStream = new MemoryStream();
            await context.HttpContext.Request.Body.CopyToAsync(requestStream);
            context.HttpContext.Request.Body = requestStream;
            string bodyString = Encoding.UTF8.GetString(requestStream.ToArray());
            context.HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);

            return _data.Method.ToUpper() == context.HttpContext.Request.Method.ToUpper() ? trueNode : falseNode;
        }
    }
}
