using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

namespace CaseExperis.Api.Models
{
    public class Embargo
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
    }
}