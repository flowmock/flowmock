namespace FlowMock.Engine.Data
{
    public class FilterAndProjectionQuery
    {
        public string Fields { get; set; } = "all";
        public int Limit { get; set; } = 10;
        public int Offset { get; set; } = 0;
    }
}