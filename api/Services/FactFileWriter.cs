using CatFactAPI.Models;
using CatFactAPI.Services.Interfaces;
using System.Text.Json;

namespace CatFactAPI.Services
{
    public class FactFileWriter : IFactFileWriter
    {
        private readonly string _directory;
        private readonly string _filePath;

        public FactFileWriter()
        {
            _directory = Environment.GetEnvironmentVariable("DATA_PATH")
                ?? AppContext.BaseDirectory;
            _filePath = Path.Combine(_directory, "facts.txt");
        }

        public async Task AppendNewFactAsync(CatFact fact)
        {

            Directory.CreateDirectory(_directory);

            var line = JsonSerializer.Serialize(fact) + Environment.NewLine;
            await File.AppendAllTextAsync(_filePath, line);
        }
        public async Task<List<CatFact>> GetAllCatFactsAsync()
        {
            if (!File.Exists(_filePath))
            {
                return new List<CatFact>();
            }

            var lines = await File.ReadAllLinesAsync(_filePath);
            var facts = new List<CatFact>();

            foreach (var line in lines)
            {
                var fact = JsonSerializer.Deserialize<CatFact>(line);
                if (fact != null)
                    facts.Add(fact);
            }

            return facts;
        }

    }
}
