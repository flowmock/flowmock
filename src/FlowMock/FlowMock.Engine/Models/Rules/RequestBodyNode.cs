using FlowMock.Engine.Models.Trigger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    [NodeType("requestBody")]
    public class RequestBodyNode : NodeBase
    {
        RequestBodyData _data;
        NameOpValueEvaluator _nameOpValueEvaluator = new NameOpValueEvaluator();

        public RequestBodyNode(Element element) : base(element)
        {
            _data = JsonSerializer.Deserialize<RequestBodyData>(element.Data);
        }

        public async override Task<INode> GetNextNodeAsync(MockContext context)
        {
            var trueNode = Connectors.FirstOrDefault(connector => connector.Id == "true")?.Connection.Node ?? new DeadEndNode();
            var falseNode = Connectors.FirstOrDefault(connector => connector.Id == "false")?.Connection.Node ?? new DeadEndNode();

            MemoryStream requestStream = new MemoryStream();
            await context.HttpContext.Request.Body.CopyToAsync(requestStream);
            context.HttpContext.Request.Body = requestStream;
            string bodyString = Encoding.UTF8.GetString(requestStream.ToArray());
            context.HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);

            var text = _data.Text;
            foreach (var envVar in context.MockState)
            {
                text = text.Replace("{{" + envVar.Key + "}}", envVar.Value);
            }

            return _nameOpValueEvaluator.Evaluate(bodyString, _data.Op, text) ? trueNode : falseNode;            
        }
    }
}
