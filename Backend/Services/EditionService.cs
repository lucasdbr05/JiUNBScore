using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.Entities;
using Backend.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Services;

public class EditionService
{
    private readonly JiunbDBContext _context;
    public EditionService(JiunbDBContext context)
    {
        _context = context;
    }

    public Edicao Create(CreateEditionViewModel data)
    {
        var edicao = _context.Edicoes
            .FromSqlRaw(
                @"INSERT INTO Edicao (data_fim, data_comeco) VALUES (@p0, @p1) RETURNING id, data_fim, data_comeco",
                data.DataFim, data.DataComeco
            )
            .AsEnumerable()
            .FirstOrDefault();
        return edicao;
    }

    public IEnumerable<Edicao> FindAll()
    {
        return _context.Edicoes
            .FromSqlRaw("SELECT id, data_fim, data_comeco FROM Edicao")
            .AsEnumerable();
    }

    public Edicao? FindOne(int id)
    {
        return _context.Edicoes
            .FromSqlRaw("SELECT id, data_fim, data_comeco FROM Edicao WHERE id = @p0", id)
            .AsEnumerable()
            .FirstOrDefault();
    }

    public Dictionary<string, List<StandingsViewModel>> GetStandings(int competitionId)
    {
        var teams = _context.Atleticas.FromSqlRaw(@"
            SELECT a.* FROM atletica a
            INNER JOIN partidas p ON (a.id = p.id_time_1 OR a.id = p.id_time_2)
            WHERE p.id_edicao = @p0
            GROUP BY a.id
        ", competitionId).ToList();

        var matches = _context.Matches.FromSqlRaw(@"
            SELECT * FROM partidas WHERE id_edicao = @p0
        ", competitionId).ToList();

        var standings = new List<StandingsViewModel>();
        foreach (var team in teams)
        {
            var jogos = matches.Where(m => m.Id_time_1 == team.Id || m.Id_time_2 == team.Id).ToList();
            int wins = jogos.Count(m => (m.Id_time_1 == team.Id && m.Placar_time_1 > m.Placar_time_2) || (m.Id_time_2 == team.Id && m.Placar_time_2 > m.Placar_time_1));
            int draws = jogos.Count(m => m.Placar_time_1 == m.Placar_time_2);
            int looses = jogos.Count(m => (m.Id_time_1 == team.Id && m.Placar_time_1 < m.Placar_time_2) || (m.Id_time_2 == team.Id && m.Placar_time_2 < m.Placar_time_1));
            int scored = jogos.Sum(m => m.Id_time_1 == team.Id ? m.Placar_time_1 : m.Id_time_2 == team.Id ? m.Placar_time_2 : 0);
            int conceded = jogos.Sum(m => m.Id_time_1 == team.Id ? m.Placar_time_2 : m.Id_time_2 == team.Id ? m.Placar_time_1 : 0);
            int saldo = scored - conceded;
            int points = wins * 3 + draws;
            int gamesPlayed = jogos.Count;

            var last5 = jogos.OrderByDescending(m => m.Data)
                .Take(5)
                .Select(m => {
                    if ((m.Id_time_1 == team.Id && m.Placar_time_1 > m.Placar_time_2) || (m.Id_time_2 == team.Id && m.Placar_time_2 > m.Placar_time_1)) return "V";
                    if (m.Placar_time_1 == m.Placar_time_2) return "E";
                    return "D";
                })
                .ToList();

            standings.Add(new StandingsViewModel(
                team.Id,
                team.Nome,
                team.Logo,
                gamesPlayed,
                wins,
                draws,
                looses,
                saldo,
                scored,
                conceded,
                last5,
                points
            ));
        }

        standings = standings.OrderByDescending(s => s.Points)
                             .ThenByDescending(s => s.ScoresDifference)
                             .ThenByDescending(s => s.Scored)
                             .ToList();
    
        for (int i = 0; i < standings.Count; i++)
            standings[i].Rank = i + 1;

        return new Dictionary<string, List<StandingsViewModel>>
        {
            { "Gropu X", standings }
        };
    }

    public Edicao? Update(int id, UpdateEditionViewModel data)
    {
        var edicao = _context.Edicoes
            .FromSqlRaw(
                @"UPDATE Edicao SET data_fim = @p1, data_comeco = @p2 WHERE id = @p0 RETURNING id, data_fim, data_comeco",
                id, data.DataFim, data.DataComeco
            )
            .AsEnumerable()
            .FirstOrDefault();
        return edicao;
    }

    public Edicao? Delete(int id)
    {
        var edicao = _context.Edicoes
            .FromSqlRaw(
                @"DELETE FROM Edicao WHERE id = @p0 RETURNING id, data_fim, data_comeco",
                id
            )
            .AsEnumerable()
            .FirstOrDefault();
        return edicao;
    }
}
