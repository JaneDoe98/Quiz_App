using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Data;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly ScoreContext _context;

        public ScoreController(ScoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ScoreRecord>>> GetTop10Score()
        {
            return Ok(await _context.Scores.OrderByDescending(i => i.Score).Take(10).ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<List<ScoreRecord>>> NewScore(ScoreRecord record)
        {
            _context.Scores.Add(record);
            await _context.SaveChangesAsync();

            return Ok(await _context.SaveChangesAsync());
        }
    }
}
