using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Trigger
{
    public class Position
    {
        [JsonPropertyName("x")]
        public int X { get; set; }

        [JsonPropertyName("y")]
        public int Y { get; set; }
    }
}
