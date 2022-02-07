using FlowMock.Engine.Models.Trigger;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    public abstract class NodeBase : INode
    {
        protected Element _element;

        public NodeBase(Element element)
        {
            _element = element;
            Id = element?.Id;
            Connectors = new List<Connector>();
        }

        public string Id { get; set; }
        public IList<Connector> Connectors { get; set; }

        public abstract Task<INode> GetNextNodeAsync(Context context);
    }
}
