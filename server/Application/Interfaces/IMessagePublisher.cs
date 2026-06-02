namespace Application.Interfaces;

public interface IMessagePublisher
{
    Task PublishEvaluationRequestedAsync(Guid answerId);
    Task PublishResumeUploadedAsync(Guid resumeId);

}