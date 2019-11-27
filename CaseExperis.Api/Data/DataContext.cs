using Microsoft.EntityFrameworkCore;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Data
{
    public class DataContext : DbContext
    {
     public DataContext(DbContextOptions<DataContext> options): base (options){}

     public DbSet<User> Users { get; set; }
     public DbSet<Ferie> Ferier { get; set; }
    }
}