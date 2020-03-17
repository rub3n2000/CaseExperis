using Microsoft.EntityFrameworkCore;
using CaseExperis.Api.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CaseExperis.Api.Data
{
    public class DataContext : DbContext
    {
     public DataContext(DbContextOptions<DataContext> options): base (options){}

     public DbSet<User> Users { get; set; }
     public DbSet<Ferie> Ferier { get; set; }

     public DbSet<Embargo> Embargoes { get; set; }

     protected override void OnModelCreating(ModelBuilder builder)
     {
         builder.Entity<User>().HasIndex(u => u.Email).IsUnique();
     }
    }
}