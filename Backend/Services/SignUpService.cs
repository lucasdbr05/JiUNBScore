using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;

namespace Backend.Services;

public class SignUpService
{
    private readonly JiunbDBContext _context;
    private readonly IConfiguration _config;

    public SignUpService(JiunbDBContext dBContext, IConfiguration config)
    {
        _context = dBContext;
        _config = config;
    }

    public string? SignUp(SignUpViewModel data)
    {

        var userSameNick = _context.Users
            .FromSqlRaw($"SELECT * FROM Usuario WHERE nickname = @p0", data.Nickname)
            .FirstOrDefault();

        if (userSameNick != null)
        {

            return "Nickname já utilizado!!";
        }

        var userSameEmail = _context.Users
            .FromSqlRaw($"SELECT * FROM Usuario WHERE email = @p0", data.Email)
            .FirstOrDefault();

        if (userSameEmail != null)
        {

            return "Esse email já tem um conta cadastrada!";
        }

        var hashSenha = treatSenha(data.Password);

        if (hashSenha == null)
        {
            // Caso a gente defina que precisa de um padrão de senha

            return "Senha invalida!";
        }

        _context.Users.Add(
            new User
            (

                data.Nickname,
                hashSenha,
                data.Email
            )
        );

        _context.SaveChanges();

        return "OK!";
    }

    private string? treatSenha(string password)
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