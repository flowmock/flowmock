using System;
using System.Collections.Generic;
using System.Text;

namespace FlowMock.Engine.Models.Rules
{
    public class Connector
    {
        public string Id { get; set; }
        public INode Node { get; set; }
        public Connector Connection { get; set; }
    }
}
