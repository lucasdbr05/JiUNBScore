using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;

namespace Backend.Services;

public class AuthService
{
    private readonly JiunbDBContext _context;
    private readonly IConfiguration _config;

    public AuthService(JiunbDBContext dBContext, IConfiguration config)
    {
        _context = dBContext;
        _config = config;
    }

    public string? Login(LoginViewModel data)
    {
        var user = _context.Users
            .FromSqlRaw($"SELECT * FROM Usuario WHERE nickname = @p0", data.Name)
            .FirstOrDefault();

        if (user == null || user.Password != hashSenha(data.Password))
            return null;

        return GenerateJwtToken(user.Nickname);
    }

    private string GenerateJwtToken(string userId)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId)
            }),
            Expires = DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:ExpiresInMinutes"])),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private string? hashSenha(string password)
    {

        byte[] hashGen = SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(password));

        var sb = new StringBuilder();

        foreach (var b in hashGen)
        {
            sb.Append(b.ToString("x2"));
        }

        return sb.ToString();
    }
}