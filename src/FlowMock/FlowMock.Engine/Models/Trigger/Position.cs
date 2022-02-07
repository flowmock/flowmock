using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Trigger
{
    public class Position
    {
        [JsonPropertyName("x")]
        public decimal X { get; set; }

        [JsonPropertyName("y")]
        public decimal Y { get; set; }
    }
}
