namespace Application.Interfaces;

public class RabbitMQSettings
{
    public string HostName { get; set; } = string.Empty;
    public string EvaluationQueueName { get; set; } = string.Empty;
    public string ResumeQueueName { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}