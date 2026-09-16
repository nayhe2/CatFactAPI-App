using CatFactAPI.Models;

namespace CatFactAPI.Services.Interfaces
{
    public interface IFactFileWriter
    {
        Task AppendNewFactAsync(CatFact fact);
        Task<List<CatFact>> GetAllCatFactsAsync();
    }
}
