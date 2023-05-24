using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Question> Questions => Set<Question>();
    }
}
