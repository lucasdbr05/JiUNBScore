using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;

namespace Backend.Services;

public class MatchService
{

    private readonly JiunbDBContext _context;
    private readonly IConfiguration _config;

    public MatchService(JiunbDBContext context, IConfiguration config)
    {

        _context = context;
        _config = config;
    }

    public string? RegisterMatch(
        RegisterMatchViewModel regMatch
    )
    {

        var checkRepeat = _context.Matches
                            .FromSqlRaw(
                                $"SELECT * FROM Partidas WHERE id_edicao = @p0 and id_fase = @p1 and id_time_1 = @p2 and id_time_2 = @p3",
                                regMatch.Id_edicao,
                                regMatch.Id_fase,
                                regMatch.Id_time_1,
                                regMatch.Id_time_2
                                ).FirstOrDefault();

        var checkRepeat1 = _context.Matches
                            .FromSqlRaw(
                                $"SELECT * FROM Partidas WHERE id_edicao = @p0 and id_fase = @p1 and id_time_1 = @p2 and id_time_2 = @p3",
                                regMatch.Id_edicao,
                                regMatch.Id_fase,
                                regMatch.Id_time_2,
                                regMatch.Id_time_1
                                ).FirstOrDefault();

        if (checkRepeat == null && checkRepeat1 == null)
        {

            _context.Matches.Add(
                new Match(
                    regMatch.Placar_time_1,
                    regMatch.Placar_time_2,
                    regMatch.Id_edicao,
                    regMatch.Id_fase,
                    regMatch.Id_local,
                    regMatch.Id_time_1,
                    regMatch.Id_time_2,
                    regMatch.Data
                )
            );

            _context.SaveChanges();
            return "OK!";
        }

        return null;
    }
}