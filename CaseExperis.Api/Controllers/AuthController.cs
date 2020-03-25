using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CaseExperis.Api.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System;
using Microsoft.AspNetCore.Identity;

namespace CaseExperis.Api.Controllers
{

[Route("api/[controller]")]
[ApiController]
[AllowAnonymous]
public class AuthController : ControllerBase
{       
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        public AuthController(IMapper mapper, IConfiguration config, UserManager<User> userManager, SignInManager<User> signInManager){
            this._mapper = mapper;
            this._config = config;
            this._userManager = userManager;
            this._signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate =  _mapper.Map<User>(userForRegisterDto);
            userToCreate.UserName = userToCreate.Email;

            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);
           
            var userToReturn = _mapper.Map<User, UserForProfileDto>(userToCreate);

            if(result.Succeeded)
            {
                return StatusCode(201);
            }
            return BadRequest(result.Errors);
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _userManager.FindByEmailAsync(userForLoginDto.Email);
            var result = await _signInManager.CheckPasswordSignInAsync(userFromRepo, userForLoginDto.Password, false);
            if(result.Succeeded) {
                var user = _mapper.Map<User, UserForProfileDto>(userFromRepo);
                return Ok(new {token = await GenerateJwtToken(userFromRepo), user});
            }
            return Unauthorized();
        }

        private async Task<string> GenerateJwtToken(User user) {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email.ToString())
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles) {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
           
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetValue<string>("Token").ToString()));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = System.DateTime.Now.AddDays(1).ToUniversalTime(),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

