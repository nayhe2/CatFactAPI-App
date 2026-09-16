using CatFactAPI.Models;

namespace CatFactAPI.Services.Interfaces
{
    public interface ICatFactService
    {
        Task<CatFact> GetCatFactAsync();
    }
}
