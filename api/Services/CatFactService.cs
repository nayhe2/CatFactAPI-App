using CatFactAPI.Services.Interfaces;
using CatFactAPI.Models;
using System.Text.Json;

namespace CatFactAPI.Services
{
    public class CatFactService : ICatFactService
    {
        private readonly HttpClient _httpClient;

        public CatFactService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CatFact> GetCatFactAsync()
        {
            var response = await _httpClient.GetAsync("fact");
            response.EnsureSuccessStatusCode();
            var json = await response.Content.ReadAsStringAsync();

            var fact = JsonSerializer.Deserialize<CatFact>(json);
            if (fact is null)
            {
                throw new InvalidOperationException("Failed to parse response from cat fact API.");
            }

            return fact;
        }
    }
}
