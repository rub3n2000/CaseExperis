using System.Collections.Generic;
using System.Threading.Tasks;
using CaseExperis.Api.Dtos;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Data
{
    public interface IFerieRepository
    {
        Task<Ferie> New(Ferie ferie);
        Task<Ferie> Edit(int id, FerieForUpdate ferie);
        Task<Ferie> GetFerie(int id);
        Task<IEnumerable<Ferie>> GetFerier();
        Task<IEnumerable<Ferie>> GetFerieByUser(int id);
        Task<bool> SaveAll();
        Task<Ferie> DeleteFerie(int id);
        Task<Ferie> MakeAccepted(int id);
    }
}