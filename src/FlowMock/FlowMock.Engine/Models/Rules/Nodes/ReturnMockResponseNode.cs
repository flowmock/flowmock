using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules.Nodes
{
    [NodeType("returnMockResponse")]
    public class ReturnMockResponseNode : NodeBase
    {
        public ReturnMockResponseNode(Element element) : base(element)
        {
        }

        public override Task<INode> GetNextNodeAsync(MockContext context)
        {
            throw new NotImplementedException();
        }
    }
}
