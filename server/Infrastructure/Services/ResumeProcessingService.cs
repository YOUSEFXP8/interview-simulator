using Application.Interfaces;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using UglyToad.PdfPig;


namespace Infrastructure.Services;

public class ResumeProcessingService: IResumeProcessingService
{
    private readonly AppDbContext _context;
    private readonly IAIProvider _aiProvider;

    public ResumeProcessingService(
        AppDbContext context,
        IAIProvider aiProvider)
    {
        _context = context;
        _aiProvider = aiProvider;
    }

    public async Task ProcessResumeAsync(Guid resumeId)
    {
        var resume = await _context.Resumes
            .FirstOrDefaultAsync(r => r.Id == resumeId);

        if (resume == null)
        {
            throw new Exception("Resume not found.");
        }


        var text = "";

        using (var document =
               PdfDocument.Open(resume.FilePath))
        {
            foreach (var page in document.GetPages())
            {
                text += page.Text;
            }
        }

        if (string.IsNullOrWhiteSpace(text))
        {
            throw new Exception("No text could be extracted from the PDF.");
        }

        var skills =
    await _aiProvider
        .ExtractSkillsAsync(text);

        resume.ExtractedSkills = skills;

        await _context.SaveChangesAsync();
    }
}
