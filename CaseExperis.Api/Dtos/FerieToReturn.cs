using System;

namespace CaseExperis.Api.Dtos
{
    public class FerieToReturn
    {
        
        public DateTime Date { get; set; } = new DateTime();

        public bool isGodkjent { get; set; } = false;

        public string AnsattNotat { get; set; } = "test";

        public string AdminNotat { get; set; } = "test";

        public string Navn { get; set; } = "navn";
    }
}