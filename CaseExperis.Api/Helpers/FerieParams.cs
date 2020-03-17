namespace CaseExperis.Api.Helpers
{
    public class FerieParams
    {
        private const int MaxPageSize = 1000000000;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 1000000000;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize)? MaxPageSize : value; }
        }
        public string Date { get; set; }        
    }
}