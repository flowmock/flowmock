using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models
{
    public class Setting
    {
        public string Key {  get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
    }
}
