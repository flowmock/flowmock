using FlowMock.Engine.Models.Rules;
using FlowMock.Engine.Models.Trigger;
using System;
using System.Linq;

namespace FlowMock.Engine
{
    public class NodeFactory
    {
        public INode GetNode(Element element)
        {
            foreach (var typesWithMyAttribute in 
                from a in AppDomain.CurrentDomain.GetAssemblies()
                from t in a.GetTypes()
                let attributes = t.GetCustomAttributes(typeof(NodeTypeAttribute), true)
                where attributes != null && attributes.Length > 0
                select new { Type = t, Attributes = attributes.Cast<NodeTypeAttribute>() })
            {
                if(element.Type == typesWithMyAttribute.Attributes.FirstOrDefault().Type)
                {
                    return Activator.CreateInstance(typesWithMyAttribute.Type, new object[] { element }) as INode;                    
                }
            }

            return null;
        }
    }
}
