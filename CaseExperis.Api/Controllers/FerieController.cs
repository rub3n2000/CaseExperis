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
    public class FerieController : ControllerBase
    {       
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFerieRepository _ferieRepository;
        public FerieController(IAuthRepository repo, IMapper mapper, IFerieRepository ferieRepository){
            this._repo = repo;
            this._mapper = mapper;
            this._ferieRepository = ferieRepository;
        }
        
        [HttpPost("new")]  
        public async Task<IActionResult> NewFerie(FerieToCreate ferieToCreate)
        {
            var ferieForUploading =  _mapper.Map<Ferie>(ferieToCreate);
           
            var uploadetFerie = await _ferieRepository.New(ferieForUploading);
            
            return StatusCode(201);
        }

        [HttpGet]

        public async Task<IActionResult> GetFerier()
        {
            var ferier = await _ferieRepository.GetFerier();
            if(ferier == null)
            {
            return NoContent();
            }
            return Ok(ferier);
        }

        [HttpGet]
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
        
        public async Task<IActionResult> EditFerie(int id)
        {
            var ferieToRedigere = await _ferieRepository.GetFerie(id);
            var redigertFerie = await _ferieRepository.Edit(id,ferieToRedigere);
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
            return Ok(acceptedFerie);
        }
    }
}