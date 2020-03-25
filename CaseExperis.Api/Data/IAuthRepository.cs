using System.Collections.Generic;
using System.Threading.Tasks;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Data
{
    public interface IAuthRepository
    {
         Task<User> GetUser(string email);
         Task<User> GetUserById(int id);
         Task<IEnumerable<User>> GetUsers();
         Task<bool> SaveAll();
         Task<UserForProfileDto> Edit(string email, UserForUpdateDto user);
         Task<User> DeleteUser(string email);

         Task<UserForProfileDto> MakeAdmin(string email);
    }
}