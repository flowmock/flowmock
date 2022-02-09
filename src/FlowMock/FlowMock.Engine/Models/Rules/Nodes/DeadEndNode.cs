using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules.Nodes
{
    public class DeadEndNode : NodeBase
    {
        public DeadEndNode() : base(null)
        {
        }

        public async override Task<INode> GetNextNodeAsync(MockContext context)
        {
            return null;
        }
    }
}
