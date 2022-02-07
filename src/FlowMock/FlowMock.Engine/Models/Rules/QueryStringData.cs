using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace FlowMock.Engine.Models.Rules
{
    public class QueryStringData
    {
        [JsonPropertyName("queryStrings")]
        public IEnumerable<NameOpValue> QueryStrings { get; set; }
    }
}
