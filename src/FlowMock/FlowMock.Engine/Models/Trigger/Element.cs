using System.Text.Json;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Trigger
{
    public class Element
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("position")]
        public Position? Position { get; set; }

        [JsonPropertyName("source")]
        public string Source { get; set; }

        [JsonPropertyName("sourceHandle")]
        public string SourceHandle { get; set; }

        [JsonPropertyName("target")]
        public string Target { get; set; }

        [JsonPropertyName("targetHandle")]
        public string TargetHandle { get; set; }

        [JsonPropertyName("data")]
        public JsonElement Data { get; set; }
    }
}
