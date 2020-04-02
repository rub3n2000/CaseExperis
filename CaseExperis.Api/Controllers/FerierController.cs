using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using CaseExperis.Api.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using Newtonsoft.Json;
using CaseExperis.Api.Helpers;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Identity;

namespace CaseExperis.Api.Controllers
{

[Route("api/[controller]")]
[ApiController]
    public class FerierController : ControllerBase
    {       
        private readonly IMapper _mapper;
        private readonly IFerieRepository _ferieRepository;

        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        private readonly SignInManager<User> _signInManager;

        public FerierController(IMapper mapper, IFerieRepository ferieRepository, DataContext context, UserManager<User> userManager, SignInManager<User> signInManager){
            this._mapper = mapper;
            this._ferieRepository = ferieRepository;
            this._context = context;
            this._userManager = userManager;
            this._signInManager = signInManager;
        }
        
        [Authorize(Roles = "Member")]
        [HttpPost("new/{id}")] 
        public async Task<IActionResult> NewFerie(int id, FerieToCreate ferieToCreate)
        {
            var ferie = await _context.Ferier.FirstAsync(u => u.Id == id);
            if(ferie.UserId.ToString() != _signInManager.Context.User.FindFirstValue(ClaimTypes.NameIdentifier) && !_signInManager.Context.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }
            var user = await _userManager.FindByIdAsync(id.ToString());
            ferieToCreate.User = user;
            ferieToCreate.UserId = id;
            var ferieForUploading =  _mapper.Map<Ferie>(ferieToCreate);
            var uploadetFerie = await _ferieRepository.New(ferieForUploading);
            return StatusCode(201);
        }

        [HttpGet]
        [AllowAnonymous]

        public async Task<IActionResult> GetFerier([FromQuery] FerieParams ferieParams)
        {
            var ferier = await _ferieRepository.GetFerier(ferieParams);
            var ferierToReturn = new List<FerieToReturn>();
           
            foreach(Ferie f in ferier)
            {
                ferierToReturn.Add(_mapper.Map<Ferie, FerieToReturn>(f));
            }

            Response.AddPagination(ferier.CurrentPage, ferier.PageSize, ferier.TotalCount, ferier.TotalPages);

            if(ferierToReturn.Count == 0)
            {
            return NoContent();
            }
            return Ok(ferierToReturn);
        }

        [HttpGet] [AllowAnonymous]
        [Route("user/{id}")]
        public async Task<IActionResult> GetFerierByUser([FromRoute] int id, [FromQuery] FerieParams ferieParams)
        {
           var ferier = await _ferieRepository.GetFerierByUser(id, ferieParams);
           
           var ferierToReturn = new List<FerieToReturn>();
           
           foreach(Ferie f in ferier)
           {
                ferierToReturn.Add(_mapper.Map<Ferie, FerieToReturn>(f));
           }

           Response.AddPagination(ferier.CurrentPage, ferier.PageSize, ferier.TotalCount, ferier.TotalPages);

           if(ferierToReturn.Count == 0)
           {
               return NoContent();
           }
           return Ok(ferierToReturn);
        }

        [HttpGet] [AllowAnonymous]
        [Route("{id}")]
        
        public async Task<IActionResult> GetFerie(int id)
        {
            var ferie = await _ferieRepository.GetFerie(id);
            if(ferie == null)
            {
            return NoContent();
            }
            return Ok(ferie);
        }

        [Authorize(Roles = "Member")]
        [HttpPut]
        [Route("{id}")]
        
        public async Task<IActionResult> EditFerie(int id, FerieForUpdate ferieForUpdate)
        {
            var ferie = await _context.Ferier.FirstAsync(u => u.Id == id);
            if(ferie.UserId.ToString() != _signInManager.Context.User.FindFirstValue(ClaimTypes.NameIdentifier) && !_signInManager.Context.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }
            var redigertFerie = await _ferieRepository.Edit(id,ferieForUpdate);
            if(redigertFerie == null)
            {
            return NoContent();
            }
            return Ok(redigertFerie);
        }


        [Authorize(Roles = "Member, Admin")]
        [HttpDelete]
        [Route("{id}")]
        
        public async Task<IActionResult> DeleteFerie(int id)
        {
            var ferie = await _context.Ferier.FirstAsync(u => u.Id == id);
            if(ferie.UserId.ToString() != _signInManager.Context.User.FindFirstValue(ClaimTypes.NameIdentifier) && !_signInManager.Context.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            var deletedFerie = await _ferieRepository.DeleteFerie(id);
            if(deletedFerie == null)
            {
            return NoContent();
            }
            return Ok(deletedFerie);
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch]
        [Route("{id}")]

        public async Task<IActionResult> MakeFerieAccepted(int id)
        {
            var acceptedFerie = await _ferieRepository.MakeAccepted(id);
            return Ok();
        }
    }
}