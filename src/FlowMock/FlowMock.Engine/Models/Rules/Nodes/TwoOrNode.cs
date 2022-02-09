using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules.Nodes
{
    [NodeType("twoOr")]
    public class TwoOrNode : NodeBase
    {
        public TwoOrNode(Element element) : base(element)
        {
        }

        public override async Task<INode> GetNextNodeAsync(MockContext context)
        {
            var execInNode = Connectors.FirstOrDefault(connector => connector.Id == "execIn")?.Connection.Node ?? new DeadEndNode();
            var aNode = Connectors.FirstOrDefault(connector => connector.Id == "a")?.Connection.Node ?? new DeadEndNode();
            var bNode = Connectors.FirstOrDefault(connector => connector.Id == "b")?.Connection.Node ?? new DeadEndNode();
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            if (await aNode.GetNextNodeAsync(context) == this || await bNode.GetNextNodeAsync(context) == this)
            {
                return trueNode;
            }
            else
            {
                return falseNode;
            }
        }
    }
}
