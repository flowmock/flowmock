using System;
using System.Collections.Generic;
using System.Text;

namespace FlowMock.FlowRulesEngine.Nodes
{
    public class DataSourceNode
    {
        public DataSourceNode()
        {

        }

        public IEnumerable<OutputConnector> OutputConnectors { get; }
    }
}
