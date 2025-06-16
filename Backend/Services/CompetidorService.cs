using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;

namespace Backend.Services;

public class CompetidorService
{

    private readonly JiunbDBContext _context;
    private readonly IConfiguration _config;
    private readonly EstatisticaService _estService;

    public CompetidorService(JiunbDBContext dBContext, IConfiguration config, EstatisticaService estService)
    {
        _context = dBContext;
        _config = config;
        _estService = estService;
    }

    public CompetidorViewModel CompetidorFinder(string id_competidor, MatchService)
    {

        var competidor = _context.Competidores
            .FromSqlRaw(
                $"SELECT * FROM Competidor WHERE matricula = @p0",
                id_competidor
                )
            .FirstOrDefault();
        
        var listPartidas
    }
    private float CalcNota(string id_competidor, int id_partida)
    {

        float nota = 0;
        float qtd = 0;

        var listActions = _estService.TakeEstats(
            id_partida, id_competidor
            );

        foreach (var estat in listActions)
        {

            if (estat.Action != null)
            {
                nota += estat.Action.Points * estat.Qtd_acoes;
                qtd += estat.Qtd_acoes;
            }
        }

        return (qtd > 0) ? nota / qtd : 0;
    }
}
