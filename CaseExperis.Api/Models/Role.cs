using System.Collections.Generic;
using DatiingApp.Api.Models;
using Microsoft.AspNetCore.Identity;

namespace DatingApp.API.Models 
{
    public class Role : IdentityRole<int> {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}