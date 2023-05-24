using System.ComponentModel.DataAnnotations;

namespace QuizAPI
{
    public class ScoreRecord
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string PlayerName { get; set; } = string.Empty;
        [Required]
        public int Score { get; set; }
    }
}
