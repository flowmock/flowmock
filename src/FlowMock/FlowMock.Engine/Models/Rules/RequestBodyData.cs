using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Rules
{
    public class RequestBodyData
    {
        [JsonPropertyName("op")]
        public string Op { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }
}
