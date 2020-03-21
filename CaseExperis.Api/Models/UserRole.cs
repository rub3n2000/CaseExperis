using CaseExperis.Api.Models;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;

namespace DatiingApp.Api.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }

    }
}