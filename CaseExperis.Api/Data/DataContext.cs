using Microsoft.EntityFrameworkCore;
using CaseExperis.Api.Models;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using DatiingApp.Api.Models;

namespace CaseExperis.Api.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, 
    IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
        public DbSet<Ferie> Ferier { get; set; }

        public DbSet<Embargo> Embargoes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<UserRole>(userRole => {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});
                userRole.HasOne(ur => ur.Role).WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId).IsRequired();

                userRole.HasOne(ur => ur.User).WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.UserId).IsRequired();
            });

            builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        }
    }
}