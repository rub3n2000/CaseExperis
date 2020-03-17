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

namespace CaseExperis.Api.Controllers
{

[Route("api/[controller]")]
[ApiController]
[Authorize]
    public class EmbargoController : ControllerBase
    {       
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFerieRepository _ferieRepository;

        private readonly DataContext _context;

        private readonly IAuthRepository _iAuthRepos;

        private readonly IEmbargoRepository _iEmbargo;
        public EmbargoController(IAuthRepository repo, IAuthRepository iAuthRepos, IMapper mapper, IFerieRepository ferieRepository, DataContext context, IEmbargoRepository iEmbargo){
            this._repo = repo;
            this._mapper = mapper;
            this._iAuthRepos = iAuthRepos;
            this._ferieRepository = ferieRepository;
            this._context = context;
            this._iEmbargo = iEmbargo;
        }
        
        [HttpPost]
        public async Task<IActionResult> NewEmbargo(EmbargoDto embargoToCreate)
        {
            
            var newEmbargo = await _iEmbargo.New(_mapper.Map<Embargo>(embargoToCreate));
            return StatusCode(201);
        }
        

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetEmbargoes([FromQuery] FerieParams ferieParams)
        {
            var embargoes = await _iEmbargo.GetEmbargoes(ferieParams);
            
            Response.AddPagination(embargoes.CurrentPage, embargoes.PageSize, embargoes.TotalCount, embargoes.TotalPages);

            if(embargoes.Count == 0)
            {
            return NoContent();
            }
            return Ok(embargoes);
        }

        [HttpGet] [AllowAnonymous]
        [Route("{id}")]
        
        public async Task<IActionResult> GetEmbargo(int id)
        {
            var embargo = await _iEmbargo.GetEmbargo(id);
            if(embargo == null)
            {
            return NoContent();
            }
            return Ok(embargo);
        }

        [HttpPut]
        [Route("{id}")]
        
        public async Task<IActionResult> EditEmbargo(int id, EmbargoDto embargo)
        {
            var embargoToReturn = await _iEmbargo.Edit(id,embargo);
            if(embargoToReturn == null)
            {
            return NoContent();
            }
            return Ok(embargoToReturn);
        }

        [HttpDelete]
        [Route("{id}")]
        
        public async Task<IActionResult> DeleteEmbargo(int id)
        {
            var deletedEmbargo = await _iEmbargo.DeleteEmbargo(id);
            if(deletedEmbargo == null)
            {
            return NoContent();
            }
            return Ok(deletedEmbargo);
        }
    }
}