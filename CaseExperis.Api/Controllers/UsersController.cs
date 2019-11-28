using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CaseExperis.Api.Dtos;

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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForProfileDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await _repo.GetUser(id);
            var endretBruker = _mapper.Map(userForUpdateDto, userFromRepo);
            if(await _repo.SaveAll())
            {
                return NoContent();
            }
            
            throw new System.Exception($"Updating User With id {id} failed on save");
        
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _repo.DeleteUser(id);
            return Ok();
        }

}
}

