using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    [NodeType("requestBody")]
    public class RequestBodyNode : NodeBase
    {
        public RequestBodyNode(Element element) : base(element)
        {
        }

        public async override Task<INode> GetNextNodeAsync(Context context)
        {
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            return trueNode;
        }
    }
}
