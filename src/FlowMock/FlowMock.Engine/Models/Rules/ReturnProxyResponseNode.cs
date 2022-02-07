using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    [NodeType("returnProxyResponse")]
    public class ReturnProxyResponseNode : NodeBase
    {
        public ReturnProxyResponseNode(Element element) : base(element)
        {
        }

        public override Task<INode> GetNextNodeAsync(Context context)
        {
            throw new NotImplementedException();
        }
    }
}
