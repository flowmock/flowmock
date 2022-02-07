using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Rules
{
    internal class DelayData
    {
        [JsonPropertyName("time")]
        public int TimeInMilliseconds { get; set; }
    }
}
