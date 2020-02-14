using System;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Dtos
{
    public class FerieToCreate
    {
        public DateTime Date { get; set; } = new DateTime();

        public string AnsattNotat { get; set; } = "test";

        public string AdminNotat { get; set; } = "test";

        public User User { get; set; }

        public int UserId { get; set; } = 1;
    }
}