using FlowMock.Engine.Models.Trigger;
using System.Linq;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    [NodeType("gotRequest")]
    public class GotRequestEventNode : NodeBase
    {
        public GotRequestEventNode(Element element) : base(element)
        {
            _element = element;
        }

        public async override Task<INode> GetNextNodeAsync(MockContext context)
        {
            var execOutNode = Connectors.FirstOrDefault(connector => connector.Id == "execOut")?.Connection.Node ?? new DeadEndNode();
            return execOutNode;
        }
    }
}
