using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using DatiingApp.Api.Models;
using Microsoft.AspNetCore.Identity;

namespace CaseExperis.Api.Models
{
    public class User : IdentityUser<int>
    {
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string TelefonNummer { get; set; }
        public int AntallFerieTatt { get; set; }
        public int AntallFerieIgjen { get; set; }
        public string LanguageCode { get; set; }
        public virtual ICollection<Ferie> Ferier { get; set; } = new List<Ferie>();
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}