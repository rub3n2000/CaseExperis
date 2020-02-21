namespace CaseExperis.Api.Helpers
{
    public class FerieParams
    {
        private const int MaxPageSize = 10;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 6;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize)? MaxPageSize : value; }
        }
        
    }
}