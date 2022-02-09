using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules.Nodes
{
    [NodeType("returnProxyResponse")]
    public class ReturnProxyResponseNode : NodeBase
    {
        public ReturnProxyResponseNode(Element element) : base(element)
        {
        }

        public override Task<INode> GetNextNodeAsync(MockContext context)
        {
            throw new NotImplementedException();
        }
    }
}
