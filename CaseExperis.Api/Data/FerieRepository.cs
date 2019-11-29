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

        public async Task<Ferie> Edit(int id, FerieForUpdate ferieForUpdate)
        {
            var ferieFraDB = await _context.Ferier.FirstAsync(u => u.Id == id);
            var redigertFerie = _mapper.Map(ferieForUpdate, ferieFraDB);
            await _context.SaveChangesAsync();
            return redigertFerie;
        }

        public async Task<FerieToReturn> GetFerie(int id)
        {
            var ferie = await _context.Ferier.Include(p => p.User).FirstAsync(u => u.Id == id);
            var ferieToReturn = _mapper.Map<Ferie,FerieToReturn>(ferie);
            if(ferie == null)
            {
                return null;
            }
            return ferieToReturn;
        }

        public async Task<IEnumerable<FerieToReturn>> GetFerieByUser(int id)
        {
            var ferier =  await _context.Ferier.Where(u => u.UserId == id).Include(p => p.User).ToListAsync();
            var ferierToReturn = new List<FerieToReturn>();
            
            foreach(Ferie f in ferier)
            {
               ferierToReturn.Add(_mapper.Map<Ferie,FerieToReturn>(f));
            }
            if(ferier.Count <= 0)
            {
                return null;
            }
            return ferierToReturn;
        }

        public async Task<IEnumerable<FerieToReturn>> GetFerier()
        {
            var ferier = await _context.Ferier.Include(p => p.User).ToListAsync();
            var ferierToReturn = new List<FerieToReturn>();
            
            foreach(Ferie f in ferier)
            {
               ferierToReturn.Add(_mapper.Map<Ferie,FerieToReturn>(f));
            }
       
            
            if(ferier.Count <= 0)
            {
                return null;
            }
            return ferierToReturn;
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
            
            var ferieToMakeGodKjentRedigert = _mapper.Map<Ferie,FerieForUpdate>(ferieToMakeGodkjent);
            await Edit(id,ferieToMakeGodKjentRedigert);
            return ferieToMakeGodkjent;
        }

        public async Task<bool> SaveAll()
        {
             return await _context.SaveChangesAsync() > 0;
        }
    }
}