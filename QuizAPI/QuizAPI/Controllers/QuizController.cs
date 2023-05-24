using Microsoft.AspNetCore.Mvc;
using QuizAPI.Data;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly DataContext _context;

        public QuizController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<Question> GetOneQuestion()
        {
            Random rnd = new Random();

            int total = _context.Questions.Count();

            int offset = rnd.Next(0, total);

            //Véletlenszerűen átugrik valamennyi elemet => random kérdés
            return Ok(_context.Questions.Skip(offset).FirstOrDefault());
        }
    }
}

