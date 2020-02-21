using System.Collections.Generic;
using System.Threading.Tasks;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Helpers;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Data
{
    public interface IFerieRepository
    {
        Task<Ferie> New(Ferie ferie);
        Task<Ferie> Edit(int id, FerieForUpdate ferie);
        Task<FerieToReturn> GetFerie(int id);
        Task<PagedList<Ferie>> GetFerier(FerieParams ferieParams);
        Task<PagedList<Ferie>> GetFerieByUser(int id, FerieParams ferieParams);
        Task<bool> SaveAll();
        Task<Ferie> DeleteFerie(int id);
        Task<Ferie> MakeAccepted(int id);
    }
}