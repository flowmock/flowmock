using FlowMock.Engine.Models.Trigger;
using System;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules.Nodes
{
    public class UrlData
    {
        [JsonPropertyName("op")]
        public string Op { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }

    [NodeType("requestUrl")]
    public class RequestUrlNode : NodeBase
    {
        UrlData _data;
        NameOpValueEvaluator _nameOpValueEvaluator = new NameOpValueEvaluator();

        public RequestUrlNode(Element element) : base(element)
        {
            _data = JsonSerializer.Deserialize<UrlData>(element.Data);
        }

        public async override Task<INode> GetNextNodeAsync(MockContext context)
        {
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            var text = _data.Text;
            foreach (var envVar in context.MockState)
            {
                text = text.Replace("{{" + envVar.Key + "}}", envVar.Value);
            }

            var mappedRequest = await context.RequestMapper.MapAsync(context.HttpContext.Request);

            return _nameOpValueEvaluator.Evaluate(mappedRequest.RequestUri.LocalPath, _data.Op, text) ? trueNode : falseNode;
        }
    }
}
