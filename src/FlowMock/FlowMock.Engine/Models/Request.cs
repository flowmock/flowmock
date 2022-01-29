using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models
{
    public class Request
    {
        [JsonPropertyName("id")]
        public long Id { get; set; }

        [JsonPropertyName("timestamp")]
        public long Timestamp { get; set; }

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("request_method")]
        public string? RequestMethod { get; set; }

        [JsonPropertyName("request_headers")]
        public string? RequestHeaders { get; set; }

        [JsonPropertyName("request_body")]
        public string? RequestBody { get; set; }

        [JsonPropertyName("response_status")]
        public int ResponseStatus { get; set; }

        [JsonPropertyName("response_headers")]
        public string? ResponseHeaders { get; set; }

        [JsonPropertyName("response_body")]
        public string? ResponseBody { get; set; }
    }
}
