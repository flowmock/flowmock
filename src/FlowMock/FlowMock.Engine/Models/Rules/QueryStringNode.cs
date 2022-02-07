using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    [NodeType("queryString")]
    public class QueryStringNode : NodeBase
    {
        QueryStringData _data;
        NameOpValueEvaluator _nameOpValueEvaluator = new NameOpValueEvaluator();

        public QueryStringNode(Element element) : base(element)
        {
            _data = JsonSerializer.Deserialize<QueryStringData>(element.Data);
        }

        public async override Task<INode> GetNextNodeAsync(Context context)
        {
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            foreach (var nameOpValue in _data.QueryStrings)
            {
                var queryString = context.HttpContext.Request.Query.FirstOrDefault(q => q.Key == nameOpValue.Name);

                if (queryString.Equals(default(KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>)))
                {
                    return falseNode;
                }

                var value = nameOpValue.Value;
                foreach (var envVar in context.MockState)
                {
                    value = value.Replace("{{" + envVar.Key + "}}", envVar.Value);
                }

                if (!_nameOpValueEvaluator.Evaluate(queryString.Value, nameOpValue.Op, value))
                {
                    return falseNode;
                }
            }

            return trueNode;
        }
    }
}
