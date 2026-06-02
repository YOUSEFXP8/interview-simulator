using System.Text;
using System.Text.Json;
using Application.Interfaces;
using Infrastructure.Models;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services;

public class GeminiProvider : IAIProvider
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GeminiProvider(
        HttpClient httpClient,
        IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<string> GenerateQuestionsAsync(
        string role,
        string difficulty,
        int count,
        string? skills)
    {
        var apiKey = _configuration["Gemini:ApiKey"];

        var url =
            $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}";

        String prompt;
        if (!string.IsNullOrWhiteSpace(skills))
        {
            prompt = $"""
Generate exactly {count} interview questions.

Role:
{role}

Difficulty:
{difficulty}

Candidate skills:
{skills}

Requirements:
- Around 70% of the questions should be tailored to the candidate's skills.
- Around 30% should test core knowledge expected for the role.
- Questions should be realistic technical interview questions.
- Return only the questions.
- One question per line.
- No numbering.
- No explanations.
""";
        }
        else
        {
             prompt = $"""
            Generate exactly {count} interview questions for a {difficulty} {role}.

            Return only the questions.
            One question per line.
            Do not include numbering.
            Do not include explanations.
            """;
        }
        

        var request = new GeminiRequest
        {
            Contents =
            [
                new GeminiContent
                {
                    Parts =
                    [
                        new GeminiPart
                        {
                            Text = prompt
                        }
                    ]
                }
            ]
        };

        var json = JsonSerializer.Serialize(request);

        var response =
            await _httpClient.PostAsync(
                url,
                new StringContent(
                    json,
                    Encoding.UTF8,
                    "application/json"));

        if (!response.IsSuccessStatusCode)
        {
            var error =
                await response.Content.ReadAsStringAsync();

            throw new Exception(error);
        }
        var content =
            await response.Content.ReadAsStringAsync();

        var geminiResponse =
            JsonSerializer.Deserialize<GeminiResponse>(
                content,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

        return geminiResponse?
            .Candidates
            .FirstOrDefault()?
            .Content
            .Parts
            .FirstOrDefault()?
            .Text
            ?? string.Empty;
    }

    public async Task<string> EvaluateAnswerAsync(
        string question,
        string answer)
    {
        var apiKey = _configuration["Gemini:ApiKey"];

        var url =
            $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}";

        var prompt = $"""
Evaluate this interview answer.

Question:
{question}

Answer:
{answer}

Return ONLY valid JSON with these properties:

score
strengths
weaknesses
feedback

Rules:
- score must be an integer from 0 to 100
- strengths must be one sentence
- weaknesses must be one sentence
- feedback must be one sentence
- return JSON only
- do not use markdown
- do not use code fences
""";

        var request = new GeminiRequest
        {
            Contents =
            [
                new GeminiContent
                {
                    Parts =
                    [
                        new GeminiPart
                        {
                            Text = prompt
                        }
                    ]
                }
            ]
        };

        var json = JsonSerializer.Serialize(request);

  

        HttpResponseMessage response = null!;

        for (int i = 0; i < 3; i++)
        {
            response =
                await _httpClient.PostAsync(
                    url,
                    new StringContent(
                        json,
                        Encoding.UTF8,
                        "application/json"));

            if (response.IsSuccessStatusCode)
            {
                break;
            }

            await Task.Delay(1000);
        }

        if (!response.IsSuccessStatusCode)
        {
            var error =
                await response.Content.ReadAsStringAsync();

            throw new Exception(error);
        }

        var content =
            await response.Content.ReadAsStringAsync();

        var geminiResponse =
            JsonSerializer.Deserialize<GeminiResponse>(
                content,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

        return geminiResponse?
            .Candidates
            .FirstOrDefault()?
            .Content
            .Parts
            .FirstOrDefault()?
            .Text
            ?? string.Empty;
    }
    public async Task<string> ExtractSkillsAsync(
    string resumeText)
    {
        var apiKey = _configuration["Gemini:ApiKey"];

        var url =
            $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={apiKey}";

        var prompt = $"""
Extract the technical and professional skills from this resume.

Return only a comma-separated list.

Resume:
{resumeText}
""";

        var request = new GeminiRequest
        {
            Contents =
                   [
                       new GeminiContent
                {
                    Parts =
                    [
                        new GeminiPart
                        {
                            Text = prompt
                        }
                    ]
                }
                   ]
        };

        var json = JsonSerializer.Serialize(request);



        HttpResponseMessage response = null!;

        for (int i = 0; i < 3; i++)
        {
            response =
                await _httpClient.PostAsync(
                    url,
                    new StringContent(
                        json,
                        Encoding.UTF8,
                        "application/json"));

            if (response.IsSuccessStatusCode)
            {
                break;
            }

            await Task.Delay(1000);
        }

        if (!response.IsSuccessStatusCode)
        {
            var error =
                await response.Content.ReadAsStringAsync();

            throw new Exception(error);
        }

        var content =
            await response.Content.ReadAsStringAsync();

        var geminiResponse =
            JsonSerializer.Deserialize<GeminiResponse>(
                content,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

        return geminiResponse?
            .Candidates
            .FirstOrDefault()?
            .Content
            .Parts
            .FirstOrDefault()?
            .Text
            ?? string.Empty;
    }
}