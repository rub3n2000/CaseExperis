using System;

namespace CaseExperis.Api.Models
{
    public class Ferie
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public bool isGodkjent { get; set; }

        public string AnsattNotat { get; set; }

        public string AdminNotat { get; set; }
        
    }
}