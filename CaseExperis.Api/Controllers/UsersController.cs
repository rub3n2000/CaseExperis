using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CaseExperis.Api.Dtos;
using System;
using Microsoft.AspNetCore.Identity;

namespace CaseExperis.Api.Controllers
{

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{       
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private readonly SignInManager<User> _signInManager;
        public UsersController(IAuthRepository repo, IMapper mapper, SignInManager<User> signInManager){
            this._repo = repo;
            this._mapper = mapper;
            this._signInManager = signInManager;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForProfileDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet] [AllowAnonymous]
        [Route("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            var user = await _repo.GetUserById(id);
            var userToReturn = _mapper.Map<UserForProfileDto>(user);
            return Ok(userToReturn);
        }
        
        
        [HttpPut]
        [Route("{email}")] [Authorize(Roles = "Member")]
        public async Task<IActionResult> UpdateUser(string email, UserForUpdateDto userForUpdateDto)
        {
            if(email != _signInManager.Context.User.Identity.Name.ToString() && !_signInManager.Context.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }
           
            var redigertUser = await _repo.Edit(email,userForUpdateDto);
            if(redigertUser == null)
            {
            return NoContent();
            }
            return Ok(redigertUser);
        }

        
        [HttpDelete]
        [Route("{email}")][Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            await _repo.DeleteUser(email);
            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch]
        [Route("{email}")]
        public async Task<IActionResult> MakeAdmin(string email)
        {
            var result = await _repo.MakeAdmin(email);
            return Ok(result);
        }

}
}

