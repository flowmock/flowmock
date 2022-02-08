using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    [NodeType("requestHeader")]
    public class RequestHeaderNode : NodeBase
    {
        HeaderData _data;
        NameOpValueEvaluator _nameOpValueEvaluator = new NameOpValueEvaluator();

        public RequestHeaderNode(Element element) : base(element)
        {
            _data = JsonSerializer.Deserialize<HeaderData>(element.Data);
        }

        public async override Task<INode> GetNextNodeAsync(MockContext context)
        {
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            foreach (var nameOpValue in _data.Headers)
            {
                var header = context.HttpContext.Request.Headers.FirstOrDefault(h => h.Key == nameOpValue.Name);

                if (header.Equals(default(KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>)))
                {
                    return falseNode;
                }

                var value = nameOpValue.Value;
                foreach (var envVar in context.MockState)
                {
                    value = value.Replace("{{" + envVar.Key + "}}", envVar.Value);
                }

                if (!_nameOpValueEvaluator.Evaluate(header.Value, nameOpValue.Op, value))
                {
                    return falseNode;
                }
            }

            return trueNode;
        }
    }
}
