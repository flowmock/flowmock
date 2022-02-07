using System;

namespace FlowMock.Engine.Models.Rules
{
    internal class NodeTypeAttribute : Attribute
    {
        public NodeTypeAttribute(string type)
        {
            Type = type;
        }

        public string Type { get; }
    }
}