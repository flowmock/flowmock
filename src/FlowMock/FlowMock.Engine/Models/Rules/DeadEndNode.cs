using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
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
