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
    private readonly MatchService _matchServ;

    public CompetidorService(
        JiunbDBContext dBContext,
        IConfiguration config,
        EstatisticaService estService,
        MatchService matchServ
        )
    {
        _context = dBContext;
        _config = config;
        _estService = estService;
        _matchServ = matchServ;
    }

    public string? RegsComp(
        RegsCompetidorViewModel regsComp
    )
    {

        var checkExisting = _context.Competidores.FromSqlRaw(
            $"SELECT * FROM Competidor WHERE matricula = @p0", regsComp.Matricula
        ).FirstOrDefault();

        if (checkExisting != null)
            return null;

        _context.Competidores.Add(
            new Competidor(
                regsComp.Matricula,
                regsComp.Nome,
                regsComp.Id_atletica
            )
        );

        _context.SaveChanges();

        return "OK!";
    }
    // TODO: End this xiburubs
    // public CompetidorScreenViewModel CompetidorFinder(string id_competidor)
    // {

    //     var competidor = _context.Competidores
    //         .FromSqlRaw(
    //             $"SELECT * FROM Competidor WHERE matricula = @p0",
    //             id_competidor
    //             )
    //         .FirstOrDefault();

    //     var listMatches = _matchServ.LastResults(competidor.Id_atletica);

    //     List<Tuple<string, string, Byte[], Byte[], int, int, float>> lastMatches = new List<Tuple<string, string, Byte[], Byte[], int, int, float>>();

    //     foreach (var match in listMatches)
    //     {

    //         lastMatches.Add(
    //             Tuple.Create(
    //                 match.Item2,
    //                 match.Item3,
    //                 match.Item4,
    //                 match.Item5,
    //                 match.Item6,
    //                 match.Item7,
    //                 CalcNota(id_competidor, match.Item1)
    //             )
    //         );
    //     }
    // }
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
