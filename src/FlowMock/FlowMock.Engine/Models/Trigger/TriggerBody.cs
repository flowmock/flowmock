using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Trigger
{
    public class TriggerBody
    {
        [JsonPropertyName("elements")]
        public IEnumerable<Element> Elements { get; set; }

        [JsonPropertyName("zoom")]
        public decimal Zoom { get; set; }

        [JsonPropertyName("position")]
        public decimal[] Position { get; set; }
    }
}
