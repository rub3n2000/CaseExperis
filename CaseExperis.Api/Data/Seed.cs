using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Models;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CaseExperis.Api.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
          if(!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role> {
                    new Role{Name="Member"},
                    new Role{Name="Admin"}
                };

                foreach (var role in roles) {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach(var user in users)
                {
                    user.UserName = user.Email;
                    userManager.CreateAsync(user, "Password1!").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }
                
                var adminUser = new User {
                    UserName = "Admin@tidsbanken.no",
                    Email = "Admin@tidsbanken.no"
                };

                var result = userManager.CreateAsync(adminUser, "complicatedPassword1_sx12").Result;

                if(result.Succeeded) {
                    var admin = userManager.FindByEmailAsync("Admin@tidsbanken.no").Result;
                    userManager.AddToRolesAsync(admin, new[] {"Admin", "Member"});
                }
            }
        }

        public static void SeedFerier(IAuthRepository _iAuthRepos, IFerieRepository _ferieRepository, DataContext _context, IMapper  _mapper)
        {
            if(!_context.Ferier.Any())
            {
                int vNumber = 1;
                var users =  _context.Users.Include(p => p.Ferier).ToList();

                for(int i = 0; i < users.Count(); i++)
                {
                    for(int j = 0; j < 4; j++)
                    {
                        Random r = new Random();
                        int rInt = r.Next(0, 14); 
                        FerieToCreate ferietoCreate = new FerieToCreate() {
                            Date = DateTime.Now.AddDays(rInt),
                            AnsattNotat = "Test",
                            AdminNotat = "Test",
                            User = users[i],
                            UserId = i
                        };
                        var userToReturn = _mapper.Map<UserForProfileDto>(users[i]);
                        userToReturn.Ferier.Add(_mapper.Map<FerieToCreate,FerieForUserProfileDto>(ferietoCreate));
                        _iAuthRepos.SaveAll();
                        var ferieForUploading =  _mapper.Map<FerieToCreate,Ferie>(ferietoCreate);
                        _ferieRepository.New(ferieForUploading);
                        Random r2 = new Random();
                        int rInt2 = r.Next(0,2);
                        if(rInt2 == 0)
                        {
                            _ferieRepository.MakeAccepted(vNumber);
                        }
                        vNumber++;
                    }
                }
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}