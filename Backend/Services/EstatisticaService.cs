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
                    data.Qtd_acoes, data.Id_partida, data.Id_acao, data.Id_competidor
                )
                .AsEnumerable()
                .FirstOrDefault();

        return stats;
    }
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
                                    
        foreach (var stat in listPlayerMatch)
        {
            stat.Action = _context.Actions.FromSqlRaw(
                @"
                    SELECT * FROM acao
                    WHERE id = @p0
                ",
                stat.Id_acao
            ).FirstOrDefault();
        }

        return listPlayerMatch;
    }
}