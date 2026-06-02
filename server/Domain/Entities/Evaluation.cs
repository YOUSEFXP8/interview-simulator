namespace Domain.Entities;

public class Evaluation
{
    public Guid Id { get; set; }

    public Guid AnswerId { get; set; }

    public int Score { get; set; }

    public string Strengths { get; set; } = string.Empty;

    public string Weaknesses { get; set; } = string.Empty;

    public string Feedback { get; set; } = string.Empty;

    public DateTime EvaluatedAt { get; set; } = DateTime.UtcNow;

    public Answer Answer { get; set; } = null!;
}