using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Trigger
{
    public class RequestHeaderData
    {
        [JsonPropertyName("headers")]
        public IEnumerable<NameOpValue> Headers { get; set; }
    }
}
