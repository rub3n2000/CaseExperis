using System;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using CaseExperis.Api.Dtos;
using Microsoft.AspNetCore.Identity;
using AutoMapper;

namespace CaseExperis.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        public AuthRepository(DataContext context, UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            this._context = context;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._mapper = mapper;
        }
        public async Task<User> DeleteUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            await _userManager.DeleteAsync(user);
            return user;
        }

        public async Task<bool> UserExists(string email)
        {
            if(await _userManager.FindByEmailAsync(email) != null)
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

        public async Task<UserForProfileDto> MakeAdmin(string email) {
            var userToMakeAdmin = await _userManager.FindByEmailAsync(email);
            if(_userManager.IsInRoleAsync(userToMakeAdmin, "Admin").Result) {
            return null;
            }
            var result = await _userManager.AddToRoleAsync(userToMakeAdmin, "Admin");
            var userToMakeAdminRedigert = _mapper.Map<User,UserForProfileDto>(userToMakeAdmin);
            return userToMakeAdminRedigert;
        }

        public async Task<UserForProfileDto> Edit(string email, UserForUpdateDto user)
        {
            var userFromDB = await _userManager.FindByEmailAsync(email);
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
                }
                if(user.Password != null) {
                    if(user.Password.Length > 7) {
                        var token = await _userManager.GeneratePasswordResetTokenAsync(userFromDB);
                        var result = await _userManager.ResetPasswordAsync(userFromDB, token,  user.Password);
                    }
                }
            await _userManager.UpdateAsync(userFromDB);
            var theUser = _mapper.Map<User,UserForProfileDto>(userFromDB);
            return theUser;
            
        }
    }
}