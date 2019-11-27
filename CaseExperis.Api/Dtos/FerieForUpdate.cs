using System;

namespace CaseExperis.Api.Dtos
{
    public class FerieForUpdate
    {
        public DateTime Date { get; set; }

        public bool isGodkjent { get; set; }

        public string AnsattNotat { get; set; }

        public string AdminNotat { get; set; }
    }
}