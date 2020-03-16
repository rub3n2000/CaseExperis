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

namespace CaseExperis.Api.Controllers
{

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UsersController : ControllerBase
{       
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IAuthRepository repo, IMapper mapper){
            this._repo = repo;
            this._mapper = mapper;
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
        [Route("{email}")]
        public async Task<IActionResult> UpdateUser(string email, UserForUpdateDto userForUpdateDto)
        {
            if(email != User.FindFirst(ClaimTypes.Name).Value)
            {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(email);
            var endretBruker = _mapper.Map(userForUpdateDto, userFromRepo);
            if(await _repo.SaveAll())
            {
                return NoContent();
            }
            
            throw new System.Exception($"Updating User With id {email} failed on save");
        
        }


        [HttpDelete]
        [Route("{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            await _repo.DeleteUser(email);
            return Ok();
        }

}
}

