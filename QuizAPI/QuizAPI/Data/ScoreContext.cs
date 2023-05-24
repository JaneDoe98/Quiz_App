using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Data
{
    public class ScoreContext : DbContext
    {
        public ScoreContext(DbContextOptions<ScoreContext> options) : base(options) { }

        public DbSet<ScoreRecord> Scores => Set<ScoreRecord>();
    }
}
