using System.Collections.Generic;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Dtos
{
    public class UserForRegisterDto
    {
        public int Id { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string TelefonNummer { get; set; }
        public string Email { get; set; }
        public int AntallFerieTatt { get; set; }
        public int AntallFerieIgjen { get; set; }
        public string LanguageCode { get; set; }
        public string Password { get; set; }
        public virtual ICollection<Ferie> Ferier { get; set; } = new List<Ferie>();
    }
}