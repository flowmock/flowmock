using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models
{
    public class Request
    {
        public long Id { get; set; }
        public long Timestamp { get; set; }
        public string? Url { get; set; }
        public string? RequestMethod { get; set; }
        public string? RequestHeaders { get; set; }
        public string? RequestBody { get; set; }
        public int ResponseStatus { get; set; }
        public string? ResponseHeaders { get; set; }
        public string? ResponseBody { get; set; }
        public long? MockId { get; set; }
    }
}
