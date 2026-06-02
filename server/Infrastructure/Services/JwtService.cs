using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Infrastructure.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(Guid userId, string email)
    {
        var secret = _configuration["Jwt:Secret"];
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];
        var expirationMinutes = int.Parse(
            _configuration["Jwt:ExpirationMinutes"]!);

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(secret!));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
{
    new Claim(
        ClaimTypes.NameIdentifier,
        userId.ToString()),

    new Claim(
        JwtRegisteredClaimNames.Sub,
        userId.ToString()),

    new Claim(
        JwtRegisteredClaimNames.Email,
        email),

    new Claim(
        JwtRegisteredClaimNames.Jti,
        Guid.NewGuid().ToString())
};

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}