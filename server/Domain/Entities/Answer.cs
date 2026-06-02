namespace Domain.Entities;

public class Answer
{
    public Guid Id { get; set; }

    public Guid InterviewSessionId { get; set; }

    public Guid QuestionId { get; set; }

    public string Content { get; set; } = string.Empty;

    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;

    public InterviewSession InterviewSession { get; set; } = null!;

    public Question Question { get; set; } = null!;

    public Evaluation? Evaluation { get; set; }
}