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

        public User User { get; set; }

        public int UserId { get; set; } = 1;

    }
}