using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    public interface INode
    {
        string Id { get; set; }

        IList<Connector> Connectors { get; set; }

        Task<INode> GetNextNodeAsync(Context context);
    }
}
