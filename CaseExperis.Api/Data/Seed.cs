using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CaseExperis.Api.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
          if(!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach(var user in users)
                {
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }

        public static void SeedFerier(IAuthRepository _iAuthRepos, IFerieRepository _ferieRepository, DataContext _context, IMapper  _mapper)
        {
            if(!_context.Ferier.Any())
            {
           
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
                        userToReturn.Ferier.Add(_mapper.Map<FerieToCreate,Ferie>(ferietoCreate));
                        _iAuthRepos.SaveAll();
                        var ferieForUploading =  _mapper.Map<FerieToCreate,Ferie>(ferietoCreate);
                        _ferieRepository.New(ferieForUploading);
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