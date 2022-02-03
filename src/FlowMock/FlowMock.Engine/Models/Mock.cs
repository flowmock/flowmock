using System.Collections.Generic;

namespace FlowMock.Engine.Models
{
    public class Mock
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string Parameters {get; set;}

        public string TriggerJson { get; set; }

        public int ResponseStatus { get; set; }

        public string ResponseHeaders { get; set; }
        public string ResponseBody { get; set; }
    }
}
