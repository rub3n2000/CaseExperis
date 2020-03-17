using System;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using CaseExperis.Api.Dtos;

namespace CaseExperis.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            this._context = context;
        }
        public async Task<User> Login(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if(user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt)) 
            {
                return null;   
            }
            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i = 0; i < computedHash.Length; i++) 
                {
                    if(computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash;
            byte[] passwordSalt;
            CreatePasswordHash(password,out passwordHash,out passwordSalt); 
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt; 

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> DeleteUser(string email)
        {
            var user = await _context.Users.FirstAsync(u => u.Email == email);
             _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if(await _context.Users.AnyAsync(x=> x.Email == email))
            {
                return true;
            }
            else 
            {
            return false;
            }
        }

        public async Task<User> GetUser(string email)
        {
            var user = await _context.Users.Include(p => p.Ferier).FirstOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async Task<User> GetUserById(int id)
        {
            var user = await _context.Users.Include(p => p.Ferier).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Ferier).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> Edit(string email, UserForUpdateDto user)
        {
            var userFromDB = await _context.Users.FirstAsync(u => u.Email == email);
            if(user != null)
            {
                if(user.Fornavn != null && user.Fornavn.ToString().Length > 0) {
                    userFromDB.Fornavn = user.Fornavn;
                }
                if(user.Etternavn != null && user.Etternavn.ToString().Length > 0) {
                    userFromDB.Etternavn = user.Etternavn;
                }

                if(user.TelefonNummer != null && user.TelefonNummer.ToString().Length > 0) {
                    userFromDB.TelefonNummer = user.TelefonNummer;
                }

                if(user.Email != null && user.Email.ToString().Length > 0) {
                    userFromDB.Email = user.Email;
                }

                if(user.AntallFerieTatt != userFromDB.AntallFerieTatt) {
                    userFromDB.AntallFerieTatt = user.AntallFerieTatt;
                }

                if(user.AntallFerieIgjen != userFromDB.AntallFerieIgjen) {
                    userFromDB.AntallFerieIgjen = user.AntallFerieIgjen;
                }

                if(user.LanguageCode != null && user.LanguageCode.ToString().Length > 1) {
                    userFromDB.LanguageCode = user.LanguageCode;
                }

                if(user.Password != null && user.Password.ToString().Length > 0) {
                    byte[] passwordHash;
                    byte[] passwordSalt;
                    CreatePasswordHash(user.Password,out passwordHash,out passwordSalt); 
                    userFromDB.PasswordHash = passwordHash;
                    userFromDB.PasswordSalt = passwordSalt; 
                }
            }
            _context.Users.Update(userFromDB);
            await _context.SaveChangesAsync();
            var theUser = userFromDB;
            return theUser;
        }
    }
}