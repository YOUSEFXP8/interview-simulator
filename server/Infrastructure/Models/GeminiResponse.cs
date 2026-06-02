using System.Text.Json.Serialization;

namespace Infrastructure.Models;

public class GeminiResponse
{
    [JsonPropertyName("candidates")]

    public List<Candidate> Candidates { get; set; } = new();
}

public class Candidate
{
    [JsonPropertyName("content")]
    public GeminiContent Content { get; set; } = new();
}