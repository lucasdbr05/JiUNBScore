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
        int placar_time_1,
        int placar_time_2,
        int id_edicao,
        int id_fase,
        int id_local,
        int id_time_1,
        int id_time_2,
        DateTime data
    )
    {

        var checkRepeat = _context.Matches
                            .FromSqlRaw(
                                $"SELECT * FROM Partidas WHERE id_edicao = @p0 and id_fase = @p1 and id_time_1 = @p2 and id_time_2 = @p3",
                                id_edicao,
                                id_fase,
                                id_time_1,
                                id_time_2
                                ).FirstOrDefault();

        var checkRepeat1 = _context.Matches
                            .FromSqlRaw(
                                $"SELECT * FROM Partidas WHERE id_edicao = @p0 and id_fase = @p1 and id_time_1 = @p2 and id_time_2 = @p3",
                                id_edicao,
                                id_fase,
                                id_time_2,
                                id_time_1
                                ).FirstOrDefault();

        if (checkRepeat == null && checkRepeat1 == null)
        {

            _context.Matches.Add(
                new Match(
                    placar_time_1,
                    placar_time_2,
                    id_edicao,
                    id_fase,
                    id_local,
                    id_time_1,
                    id_time_2,
                    data
                )
            );
            return "OK!";
        }

        return null;
    }
}