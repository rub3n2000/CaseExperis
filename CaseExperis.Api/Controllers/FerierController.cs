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

        public FerierController(IMapper mapper, IFerieRepository ferieRepository, DataContext context, UserManager<User> userManager){
            this._mapper = mapper;
            this._ferieRepository = ferieRepository;
            this._context = context;
            this._userManager = userManager;
        }
        
        [HttpPost("new/{id}")]
        public async Task<IActionResult> NewFerie(int id, FerieToCreate ferieToCreate)
        {
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

        [HttpPut]
        [Route("{id}")]
        
        public async Task<IActionResult> EditFerie(int id, FerieForUpdate ferieForUpdate)
        {
            var redigertFerie = await _ferieRepository.Edit(id,ferieForUpdate);
            if(redigertFerie == null)
            {
            return NoContent();
            }
            return Ok(redigertFerie);
        }

        [HttpDelete]
        [Route("{id}")]
        
        public async Task<IActionResult> DeleteFerie(int id)
        {
            var deletedFerie = await _ferieRepository.DeleteFerie(id);
            if(deletedFerie == null)
            {
            return NoContent();
            }
            return Ok(deletedFerie);
        }

        [HttpPatch]
        [Route("{id}")]

        public async Task<IActionResult> MakeFerieAccepted(int id)
        {
            var acceptedFerie = await _ferieRepository.MakeAccepted(id);
            return Ok();
        }
    }
}