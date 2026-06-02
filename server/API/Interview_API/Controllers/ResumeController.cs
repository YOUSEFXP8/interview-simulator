using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Interview_API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ResumeController : ControllerBase
{
    private readonly IResumeService _resumeService;
    private readonly IMessagePublisher _messagePublisher;

    public ResumeController(
        IResumeService resumeService, IMessagePublisher messagePublisher    )
    {
        _resumeService = resumeService;
        _messagePublisher = messagePublisher;
    }

    [HttpPost]
    public async Task<IActionResult> Upload(
        IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("File is required.");
        }

        if (Path.GetExtension(file.FileName).ToLower() != ".pdf")
        {
            return BadRequest("Only PDF files are allowed.");
        }

        var userId = Guid.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var uploadsFolder = Path.Combine(
            Directory.GetCurrentDirectory(),
            "Uploads",
            "Resumes");

        Directory.CreateDirectory(uploadsFolder);

        var storedFileName =
            $"{Guid.NewGuid()}.pdf";

        var fullPath =
            Path.Combine(
                uploadsFolder,
                storedFileName);

        using (var stream =
               new FileStream(
                   fullPath,
                   FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        var result =
            await _resumeService.UploadAsync(
                userId,
                file.FileName,
                fullPath);
        await _messagePublisher
    .PublishResumeUploadedAsync(result.Id);
        return Ok(result);
    }

    [HttpGet("{resumeId:guid}")]
    public async Task<IActionResult> Get(
        Guid resumeId)
    {
        var result =
            await _resumeService.GetAsync(resumeId);

        if (result == null)
        {
            return NotFound();
        }

        return Ok(result);
    }
}