using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Trigger
{
    public  class MockParameter
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("value")]
        public string Value { get; set; }
    }
}
