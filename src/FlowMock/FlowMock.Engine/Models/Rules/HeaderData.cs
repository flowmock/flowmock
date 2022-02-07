using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Rules
{
    public class HeaderData
    {
        [JsonPropertyName("headers")]
        public IEnumerable<NameOpValue> Headers { get; set; }
    }
}
