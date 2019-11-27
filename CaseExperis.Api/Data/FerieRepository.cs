using System;
using System.Threading.Tasks;
using CaseExperis.Api.Models;
using CaseExperis.Api.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Diagnostics;
using AutoMapper;

namespace CaseExperis.API.Data
{
    public class FerieRepository : IFerieRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FerieRepository(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        public async Task<Ferie> DeleteFerie(int id)
        {
            var ferie = await _context.Ferier.FirstAsync(u => u.Id == id);
            if(ferie == null)
            {
                return null;
            }
            _context.Ferier.Remove(ferie);
            await _context.SaveChangesAsync();
            return ferie;
        }

        public async Task<Ferie> Edit(int id, Ferie ferieForUpdate)
        {
            var ferieFraDB = await GetFerie(id);
            _mapper.Map(ferieForUpdate, ferieFraDB);
            if(await SaveAll())
            {
                return null;
            }
            
            throw new System.Exception($"Updating Ferie With id {id} failed on save");
        }

        public async Task<Ferie> GetFerie(int id)
        {
            var ferie = await _context.Ferier.FirstAsync(u => u.Id == id);
            if(ferie == null)
            {
                return null;
            }
            return ferie;
        }

        public async Task<IEnumerable<Ferie>> GetFerier()
        {
            var ferier = await _context.Ferier.ToListAsync();
            
            if(ferier.Count <= 0)
            {
                return null;
            }
            return ferier;
        }

        
        public async Task<Ferie> New(Ferie ferie)
        {
                await _context.Ferier.AddAsync(ferie);
                await _context.SaveChangesAsync();
                return ferie;
        }

        public async Task<Ferie> MakeAccepted(int id)
        {
            var ferieToMakeGodkjent = await _context.Ferier.FirstAsync(u => u.Id == id);
            ferieToMakeGodkjent.isGodkjent = true;
            await Edit(id,ferieToMakeGodkjent);
            return ferieToMakeGodkjent;
        }

        public async Task<bool> SaveAll()
        {
             return await _context.SaveChangesAsync() > 0;
        }
    }
}