using FlowMock.Engine.Models.Trigger;
using System.Linq;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules.Nodes
{
    [NodeType("fourAnd")]
    internal class FourAndNode : NodeBase
    {
        public FourAndNode(Element element) : base(element)
        {
        }

        public async override Task<INode> GetNextNodeAsync(MockContext context)
        {
            var execInNode = Connectors.FirstOrDefault(connector => connector.Id == "execIn")?.Connection.Node ?? new DeadEndNode();
            var aNode = Connectors.FirstOrDefault(connector => connector.Id == "a")?.Connection.Node ?? new DeadEndNode();
            var bNode = Connectors.FirstOrDefault(connector => connector.Id == "b")?.Connection.Node ?? new DeadEndNode();
            var cNode = Connectors.FirstOrDefault(connector => connector.Id == "c")?.Connection.Node ?? new DeadEndNode();
            var dNode = Connectors.FirstOrDefault(connector => connector.Id == "d")?.Connection.Node ?? new DeadEndNode();
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            if (await aNode.GetNextNodeAsync(context) == this &&
                await bNode.GetNextNodeAsync(context) == this &&
                await cNode.GetNextNodeAsync(context) == this &&
                await dNode.GetNextNodeAsync(context) == this)
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
