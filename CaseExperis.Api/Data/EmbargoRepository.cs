using System;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using AutoMapper;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text.Encodings;
using System.Linq;
using Newtonsoft.Json;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Helpers;

namespace CaseExperis.API.Data
{
    public class EmbargoRepository : IEmbargoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public EmbargoRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        public async Task<EmbargoDto> DeleteEmbargo(int id)
        {
            var embargo = await _context.Embargoes.FirstAsync(u => u.Id == id);
            if(embargo == null)
            {
                return null;
            }
            _context.Embargoes.Remove(embargo);
            await _context.SaveChangesAsync();
            var embargoDto = _mapper.Map<Embargo, EmbargoDto>(embargo);
            return embargoDto;
        }

        public async Task<EmbargoDto> Edit(int id, EmbargoDto embargo)
        {
            var embargoFromDB = await _context.Embargoes.FirstAsync(u => u.Id == id);
            embargoFromDB.Date = embargo.Date;
            _context.Embargoes.Update(embargoFromDB);
            await _context.SaveChangesAsync();
            return _mapper.Map<Embargo, EmbargoDto>(embargoFromDB);
        }
        public async Task<Embargo> GetEmbargo(int id)
        {
            var embargo = await _context.Embargoes.Where(p => p.Id == id).FirstAsync();
            if(embargo == null)
            {
                return null;
            }
            return embargo;
        }

        public async Task<PagedList<Embargo>> GetEmbargoes(FerieParams ferieParams)
        {
            var embargoes = _context.Embargoes.
            OrderBy(u => u.Date).AsQueryable();
            
            if(!string.IsNullOrEmpty(ferieParams.Date))
            {
                embargoes = embargoes.Where(u => u.Date.Date == DateTime.Parse(ferieParams.Date).Date);
            }
            
            return await PagedList<Embargo>.CreateAsync(embargoes, ferieParams.PageNumber, ferieParams.PageSize);
        }

        public async Task<Embargo> New(Embargo embargo)
        {
            await _context.Embargoes.AddAsync(embargo);
            await _context.SaveChangesAsync();
            return embargo;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}