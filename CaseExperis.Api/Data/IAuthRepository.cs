using System.Collections.Generic;
using System.Threading.Tasks;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(int id, string password);
         Task<bool> UserExists(int id);
         Task<User> GetUser(int id);
         Task<IEnumerable<User>> GetUsers();
         Task<bool> SaveAll();

         Task<User> DeleteUser(int id);
    }
}