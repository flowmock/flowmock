using FlowMock.Engine.Models.Trigger;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace FlowMock.Engine.Models.Rules
{
    [NodeType("delay")]
    public class DelayNode : NodeBase
    {
        DelayData _data;
        public DelayNode(Element element) : base(element)
        {
            _data = JsonSerializer.Deserialize<DelayData>(element.Data);
        }

        public override async Task<INode> GetNextNodeAsync(Context context)
        {
            var execOutNode = Connectors.FirstOrDefault(connector => connector.Id == "execOut")?.Connection.Node ?? new DeadEndNode();

            await Task.Delay(_data.TimeInMilliseconds);

            return execOutNode;
        }
    }
}
