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

    public Match? Create(
        RegisterMatchViewModel regMatch
    )
    {
        var checkRepeat = _context.Matches
                            .FromSqlRaw(
                                    $"SELECT * FROM Partidas WHERE id_edicao = @p0 and id_fase = @p1 and id_time_1 = @p2 and id_time_2 = @p3",
                                regMatch.IdEdicao,
                                regMatch.IdFase,
                                regMatch.IdTime1,
                                regMatch.IdTime2
                                ).FirstOrDefault();

        var checkRepeat1 = _context.Matches
                            .FromSqlRaw(
                                $"SELECT * FROM Partidas WHERE id_edicao = @p0 and id_fase = @p1 and id_time_1 = @p2 and id_time_2 = @p3",
                                regMatch.IdEdicao,
                                regMatch.IdFase,
                                regMatch.IdTime2,
                                regMatch.IdTime1
                                ).FirstOrDefault();

        if (checkRepeat == null && checkRepeat1 == null)
        {
            var match = _context.Matches
            .FromSqlRaw(
                @"INSERT INTO partidas (
                    placar_time_1,
                    placar_time_2,
                    id_edicao,
                    id_esporte,
                    id_fase,
                    id_local,
                    id_time_1,
                    id_time_2,
                    date)
                 VALUES (@p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8)
                 RETURNING id, placar_time_1, placar_time_2, id_edicao, id_esporte, id_fase, id_local, id_time_1, id_time_2, date",
                regMatch.PlacarTime1,
                regMatch.PlacarTime2,
                regMatch.IdEdicao,
                regMatch.IdEsporte,
                regMatch.IdFase,
                regMatch.IdLocal,
                regMatch.IdTime1,
                regMatch.IdTime2,
                regMatch.Data
            )
            .AsEnumerable()
            .FirstOrDefault();
            
            return match;
        }

        return null;
    }

    public IEnumerable<Match> LastResults(int id_atletica)
    {

        var listMatches = _context.Matches.FromSqlRaw(
            @"SELECT *
            FROM partidas AS m
            WHERE m.id_time_1 = @p0 OR m.id_time_2 = @p0
            ORDER BY date DESC",
            id_atletica
            )
            .ToList();

        List<Match> results = new List<Match>();
        foreach (var match in listMatches)
        {

            if (results.Count == 5) break;

            match.Time_1 = _context.Atleticas.FromSqlRaw(
                @"
                    SELECT * 
                    FROM atletica
                    WHERE id = @p0
                 ",
                 match.Id_time_1
            )
            .FirstOrDefault();

            match.Time_2 = _context.Atleticas.FromSqlRaw(
                @"
                    SELECT * 
                    FROM atletica
                    WHERE id = @p0
                ",
                 match.Id_time_2
            )
            .FirstOrDefault();
        }

        return results.AsEnumerable();
    }
    public IEnumerable<Match> FindAll(
        int? idEsporte = null
    )
    {

        if (idEsporte.HasValue)
            return _context.Matches.FromSqlRaw(@"
                SELECT * FROM Partidas
                WHERE id_esporte = @p0
            ", idEsporte.Value).AsEnumerable();
        return _context.Matches.FromSqlRaw("SELECT * FROM Partidas").AsEnumerable();
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
                @"UPDATE Partidas SET placar_time_1 = @p1, placar_time_2 = @p2, id_edicao = @p3, id_fase = @p4, id_local = @p5, id_time_1 = @p6, id_time_2 = @p7, date = @p8, id_esporte = @p9 WHERE id = @p0 RETURNING *",
                id,
                data.PlacarTime1,
                data.PlacarTime2,
                data.IdEdicao,
                data.IdFase,
                data.IdLocal,
                data.IdTime1,
                data.IdTime2,
                data.Data,
                data.IdEsporte
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