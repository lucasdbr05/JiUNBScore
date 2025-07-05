using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;
using System.Reflection.Metadata.Ecma335;

namespace Backend.Services;

public class EstatisticaService
{

    private readonly JiunbDBContext _context;
    private readonly IConfiguration _config;

    public EstatisticaService(JiunbDBContext dBContext, IConfiguration config)
    {
        _context = dBContext;
        _config = config;
    }

    public Estatisticas RegsStat(RegsStatsViewModel data)
    {

        var stats = _context.Estatisticas.FromSqlRaw(
                    @"
                    INSERT INTO Estatisticas (qtd_acoes, id_partida, id_acao, id_competidor)
                    VALUES (@p0, @p1, @p2, @p3)
                    RETURNING id, qtd_acoes, id_partida, id_acao, id_competidor
                    ",  
                    data.QtdAcoes, data.IdPartida, data.IdAcao, data.IdCompetidor
                )
                .AsEnumerable()
                .FirstOrDefault();

        return stats;
    }

    public Estatisticas? Update(int id, UpdateStatViewModel updtStat)
    {
        return _context.Estatisticas
            .FromSqlRaw(
                @"
                UPDATE estatisticas
                SET qtd_acoes = @p0, id_acao = @p1, id_partida = @p2, id_competidor = @p3
                WHERE id = @p4
                RETURNING *
                ",
                updtStat.QtdAcoes,
                updtStat.IdAcao,
                updtStat.IdPartida,
                updtStat.IdCompetidor,
                id
            )
            .AsEnumerable()
            .FirstOrDefault();
    }

    public Estatisticas? Delete(int id)
    {
        
        return _context.Estatisticas
            .FromSqlRaw(
                @"
                DELETE FROM estatisticas
                WHERE id = @p0
                RETURNING *
                ",
                id
            )
            .AsEnumerable()
            .FirstOrDefault();
    }
    public IEnumerable<Estatisticas> FindAll()
    {

        var result = _context.Estatisticas
            .FromSqlRaw(
                @"

                SELECT * FROM Estatisticas
                "
            )
            .AsEnumerable()
            .ToList();

        for (int i = 0; i < result.Count(); i++)
            Instantiate(result[i]);

        return result.AsEnumerable();
    }
    public IEnumerable<Estatisticas> FindStatPartida(int id_partida)
    {

        var result = _context.Estatisticas
            .FromSqlRaw(
                @"
                    SELECT * FROM Estatisticas
                    WHERE id_partida = @p0
                ",
                id_partida
            )
            .AsEnumerable()
            .ToList();

        for (int i = 0; i < result.Count(); i++)
            Instantiate(result[i]);

        return result.AsEnumerable();
    }

    public IEnumerable<Estatisticas> FindStatAcao(int id_acao)
    {

        var result = _context.Estatisticas
            .FromSqlRaw(
                @"
                    SELECT * FROM Estatisticas
                    WHERE id_acao = @p0
                ",
                id_acao
            )
            .AsEnumerable()
            .ToList();

        for (int i = 0; i < result.Count(); i++)
            Instantiate(result[i]);

        return result.AsEnumerable();
    }

    public IEnumerable<Estatisticas> FindStat(int id)
    {

        var result = _context.Estatisticas
            .FromSqlRaw(
                @"
                    SELECT * FROM Estatisticas
                    WHERE id = @p0
                ",
                id
            )
            .AsEnumerable()
            .ToList();

        for (int i = 0; i < result.Count(); i++)
            Instantiate(result[i]);

        return result.AsEnumerable();
    }
    
     public IEnumerable<Estatisticas> FindStatCompetidor(string id_competidor)
    {

        var result = _context.Estatisticas
            .FromSqlRaw(
                @"
                    SELECT * FROM Estatisticas
                    WHERE id_competidor = @p0
                ",
                id_competidor
            )
            .AsEnumerable()
            .ToList();

        for (int i = 0; i < result.Count(); i++)
            Instantiate(result[i]);

        return result.AsEnumerable();
    }

    // public Estatisticas? Update()
    public List<Estatisticas> TakeEstats(int id_partida, string id_competidor)
    {

        var listPlayerMatch = _context.Estatisticas
                                .FromSqlRaw(
                                    @"
                                    SELECT * FROM Estatisticas WHERE id_partida = @p0 and id_competidor = @p1
                                    ",
                                    id_partida,
                                    id_competidor
                                    ).ToList();

        for (int i = 0; i < listPlayerMatch.Count(); i++)
            Instantiate(listPlayerMatch[i]);


        return listPlayerMatch;
    }

    private void Instantiate(Estatisticas stat)
    {

        stat.Match = _context.Matches
                    .FromSqlRaw(
                        @"
                        SELECT * FROM partidas
                        WHERE id = @p0
                        ",
                        stat.Id_partida
                    )
                    .FirstOrDefault();

        stat.Action = _context.Actions
                .FromSqlRaw(
                    @"
                    SELECT * FROM acao
                    WHERE id = @p0
                    ",
                    stat.Id_acao
                )
                .FirstOrDefault();

        stat.Competidor = _context.Competidores
                .FromSqlRaw(
                    @"
                    SELECT * FROM competidor
                    WHERE matricula = @p0
                    ",
                    stat.Id_competidor
                )
                .FirstOrDefault();
                
    }
}