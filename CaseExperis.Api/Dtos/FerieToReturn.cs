using System;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Dtos
{
    public class FerieToReturn
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = new DateTime();
        public bool isGodkjent { get; set; } = false;
        public string AnsattNotat { get; set; } = "test";
        public string AdminNotat { get; set; } = "test";
        public string Navn { get; set; } = "navn";
        public UserForProfileDto User { get; set; }
    }
}