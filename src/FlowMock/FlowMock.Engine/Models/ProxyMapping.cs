using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models
{
    public class ProxyMapping
    {
        public string BasePath { get; set; }
        public string ProxyToBaseUrl { get; set; }
    }
}
