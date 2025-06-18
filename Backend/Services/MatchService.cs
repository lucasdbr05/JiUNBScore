using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;

namespace Backend.Services;

public class MatchService
{

    private readonly JiunbDBContext _context;

    public MatchService(JiunbDBContext context)
    {

        _context = context;
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

    public IEnumerable<Match> FindAll()
    {
        return _context.Matches
            .FromSqlRaw("SELECT * FROM Partidas")
            .AsEnumerable();
    }

    public Match? FindOne(int id)
    {
        return _context.Matches
            .FromSqlRaw("SELECT * FROM Partidas WHERE id = @p0", id)
            .AsEnumerable()
            .FirstOrDefault();
    }

    public Match? Update(int id, UpdateMatchViewModel data)
    {
        var match = _context.Matches
            .FromSqlRaw(
                @"UPDATE Partidas SET placar_time_1 = @p1, placar_time_2 = @p2, id_edicao = @p3, id_fase = @p4, id_local = @p5, id_time_1 = @p6, id_time_2 = @p7, date = @p8 WHERE id = @p0 RETURNING *",
                id,
                data.Placar_time_1,
                data.Placar_time_2,
                data.Id_edicao,
                data.Id_fase,
                data.Id_local,
                data.Id_time_1,
                data.Id_time_2,
                data.Data
            )
            .AsEnumerable()
            .FirstOrDefault();
        return match;
    }

    public Match? Delete(int id)
    {
        var match = _context.Matches
            .FromSqlRaw(
                @"DELETE FROM Partidas WHERE id = @p0 RETURNING *",
                id
            )
            .AsEnumerable()
            .FirstOrDefault();
        return match;
    }
}