namespace Domain.Entities;

public class Question
{
    public Guid Id { get; set; }

    public Guid InterviewSessionId { get; set; }

    public string Content { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public InterviewSession InterviewSession { get; set; } = null!;
}