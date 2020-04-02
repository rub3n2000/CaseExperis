using Microsoft.EntityFrameworkCore;
using CaseExperis.Api.Models;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using DatiingApp.Api.Models;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.Storage;
using MySql.Data.EntityFrameworkCore;

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

            // Shorten key length for Identity
            builder.Entity<User>(entity => entity.Property(m => m.Id).HasMaxLength(127));
            builder.Entity<User>(entity => entity.Property(m => m.NormalizedEmail).HasMaxLength(127));
            builder.Entity<User>(entity => entity.Property(m => m.Email).HasMaxLength(127));
            builder.Entity<User>(entity => entity.Property(m => m.UserName).HasMaxLength(127));
            builder.Entity<User>(entity => entity.Property(m => m.NormalizedUserName).HasMaxLength(127));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.Email).HasMaxLength(127));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.NormalizedEmail).HasMaxLength(127));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.NormalizedUserName).HasMaxLength(127));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.UserName).HasMaxLength(127));
            builder.Entity<IdentityRole>(entity => entity.Property(m => m.Id).HasMaxLength(127));
            builder.Entity<UserRole>(entity => entity.Property(m => m.RoleId).HasMaxLength(127));
            builder.Entity<UserRole>(entity => entity.Property(m => m.UserId).HasMaxLength(127));
            builder.Entity<IdentityRole>(entity => entity.Property(m => m.NormalizedName).HasMaxLength(127));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.NormalizedUserName).HasMaxLength(127));
            builder.Entity<IdentityRole>(entity => entity.Property(m => m.Name).HasMaxLength(127));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.UserName).HasMaxLength(127));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.Id).HasMaxLength(127));
            builder.Entity<IdentityRole>(entity => entity.Property(m => m.Name).HasMaxLength(127));
            builder.Entity<Role>(entity => entity.Property(m => m.NormalizedName).HasMaxLength(127));
            builder.Entity<Role>(entity => entity.Property(m => m.Name).HasMaxLength(127));
            builder.Entity<IdentityUserLogin<int>>(entity =>
            {
                entity.Property(m => m.LoginProvider).HasMaxLength(127);
                entity.Property(m => m.ProviderKey).HasMaxLength(127);
            });
            builder.Entity<IdentityUserToken<int>>(entity =>
            {
                entity.Property(m => m.UserId).HasMaxLength(127);
                entity.Property(m => m.LoginProvider).HasMaxLength(127);
                entity.Property(m => m.Name).HasMaxLength(127);
            });

            builder.Entity<IdentityUser>(entity => entity.Property(m => m.EmailConfirmed).HasConversion(new BoolToZeroOneConverter<short>()));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.PhoneNumberConfirmed).HasConversion(new BoolToZeroOneConverter<short>()));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.TwoFactorEnabled).HasConversion(new BoolToZeroOneConverter<short>()));
            builder.Entity<IdentityUser>(entity => entity.Property(m => m.LockoutEnabled).HasConversion(new BoolToZeroOneConverter<short>()));

            builder.Entity<User>(entity => entity.Property(m => m.EmailConfirmed).HasConversion(new BoolToZeroOneConverter<short>()));
            builder.Entity<User>(entity => entity.Property(m => m.PhoneNumberConfirmed).HasConversion(new BoolToZeroOneConverter<short>()));
            builder.Entity<User>(entity => entity.Property(m => m.TwoFactorEnabled).HasConversion(new BoolToZeroOneConverter<short>()));
            builder.Entity<User>(entity => entity.Property(m => m.LockoutEnabled).HasConversion(new BoolToZeroOneConverter<short>()));
            builder.Entity<Ferie>(entity => entity.Property(m => m.isGodkjent).HasConversion(new BoolToZeroOneConverter<short>()));
        }
    }
}