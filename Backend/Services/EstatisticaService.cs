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

    public string RegsStat(RegsStatsViewModel regStats)
    {

        _context.Estatisticas.Add(
            new Estatisticas(

                regStats.Qtd_acoes,
                regStats.Id_partida,
                regStats.Id_acao,
                regStats.Id_competidor
            )
        );

        _context.SaveChanges();
        return "OK!";
    }
    public List<Estatisticas> TakeEstats(int id_partida, string id_competidor)
    {

        var listPlayerMatch = _context.Estatisticas
                                    .FromSqlRaw(
                                        $"SELECT * FROM Estatisticas WHERE id_partida = @p0 and id_competidor = @p1",
                                        id_partida,
                                        id_competidor
                                        ).ToList();

        return listPlayerMatch;
    }
}