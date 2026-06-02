public interface IResumeProcessingService
{
    Task ProcessResumeAsync(Guid resumeId);
}