using CatFactAPI.Models;
using CatFactAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CatFactAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatFactController : ControllerBase
    {
        private readonly ICatFactService _catFactService;
        private readonly IFactFileWriter _factFileWriter;
        public CatFactController(ICatFactService catFactService, IFactFileWriter factFileWriter)
        {
            _catFactService = catFactService;
            _factFileWriter = factFileWriter;
        }

        [HttpGet]
        public async Task<IActionResult> GetCatFactAsync()
        {
            CatFact fact;
            try
            {
                fact = await _catFactService.GetCatFactAsync();
            }
            catch (Exception e) when (e is HttpRequestException or TaskCanceledException)
            {
                return StatusCode(502, new { error = "Could not reach the cat fact API." });
            }

            try
            {
                await _factFileWriter.AppendNewFactAsync(fact);
            }
            catch (Exception e) when (e is IOException or UnauthorizedAccessException)
            {
                return Ok(new { fact = fact.Fact, length = fact.Length, warning = "Fact fetched, but saving to file failed." });
            }

            return Ok(fact);
        }


        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            List<CatFact> facts = new();
            try
            {
                facts = await _factFileWriter.GetAllCatFactsAsync();
            }
            catch (Exception e) when (e is IOException or UnauthorizedAccessException)
            {
                return StatusCode(500, new { error = "Failed to read fact history." });
            }
            return Ok(facts);
        }
    }

}
