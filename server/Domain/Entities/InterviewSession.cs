namespace Domain.Entities;

public class InterviewSession
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string Role { get; set; } = string.Empty;

    public string Difficulty { get; set; } = string.Empty;

    public DateTime StartedAt { get; set; } = DateTime.UtcNow;

    public DateTime? CompletedAt { get; set; }

    public User User { get; set; } = null!;

    public ICollection<Question> Questions { get; set; }
        = new List<Question>();

    public ICollection<Answer> Answers { get; set; }
        = new List<Answer>();
}