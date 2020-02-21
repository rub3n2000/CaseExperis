using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

namespace CaseExperis.Api.Models
{
    public class User
    {
        public int Id { get; set; } 
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        public string TelefonNummer { get; set; }
        public string Email { get; set; }
        public int AntallFerieTatt { get; set; }
        public int AntallFerieIgjen { get; set; }
        public string LanguageCode { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public virtual ICollection<Ferie> Ferier { get; set; } = new List<Ferie>();

        public static implicit operator User(Task<User> v)
        {
            throw new NotImplementedException();
        }
    }
}