using System.Collections.Generic;
using System.Threading.Tasks;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Helpers;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Data
{
    public interface IEmbargoRepository
    {
        Task<Embargo> New(Embargo embargo);
        Task<EmbargoDto> Edit(int id, EmbargoDto embargo);
        Task<Embargo> GetEmbargo(int id);
        Task<PagedList<Embargo>> GetEmbargoes(FerieParams ferieParams);
        Task<bool> SaveAll();
        Task<EmbargoDto> DeleteEmbargo(int id);
    }
}