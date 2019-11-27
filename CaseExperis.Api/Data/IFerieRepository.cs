using System.Collections.Generic;
using System.Threading.Tasks;
using CaseExperis.Api.Models;

namespace CaseExperis.Api.Data
{
    public interface IFerieRepository
    {
        Task<Ferie> New(Ferie ferie);
        Task<Ferie> Edit(int id, Ferie ferie);
        Task<Ferie> GetFerie(int id);
        Task<IEnumerable<Ferie>> GetFerier();
        Task<bool> SaveAll();
        Task<Ferie> DeleteFerie(int id);
        Task<Ferie> MakeAccepted(int id);
    }
}