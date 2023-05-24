using System.ComponentModel.DataAnnotations;

namespace QuizAPI
{
    public class Question
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string QuestionName { get; set; } = string.Empty;
        [Required]
        public string AnswerA { get; set; } = string.Empty;
        [Required]
        public string AnswerB { get; set; } = string.Empty;
        [Required]
        public string AnswerC { get; set; } = string.Empty;
        [Required]
        public string AnswerD { get; set; } = string.Empty;
        [Required]
        public char CorrectAnswer { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}
