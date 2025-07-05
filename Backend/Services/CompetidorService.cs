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

    public Competidor? RegsComp(
        RegsCompetidorViewModel regsComp
    )
    {

        var checkExisting = _context.Competidores.FromSqlRaw(
            $"SELECT * FROM Competidor WHERE matricula = @p0", regsComp.Matricula
        ).FirstOrDefault();

        if (checkExisting != null)
            return null;

        var comp = _context.Competidores.FromSqlRaw(
            @"
            INSERT INTO Competidor (matricula, nome, id_atletica)
            VALUES (@p0, @p1, @p2)
            RETURNING matricula, nome, id_atletica
            ",
            regsComp.Matricula, regsComp.Nome, regsComp.Id_atletica
        )
        .AsEnumerable()
        .FirstOrDefault();

        _context.SaveChanges();

        return comp;
    }

    public IEnumerable<Competidor> FindAll(
        int? idTime1,
        int? idTime2,
        int? idEsporte
    )
    {
        if (!idTime1.HasValue && !idTime2.HasValue && !idEsporte.HasValue)
        {
            return _context.Competidores
                .FromSqlRaw("SELECT * FROM Competidor")
                .AsEnumerable();
        }
        if (idTime1.HasValue && idTime2.HasValue && idEsporte.HasValue)
        {
            string sql = @"SELECT * FROM Competidor WHERE 
                (id_atletica = @p0 OR id_atletica = @p1)
                AND id_atletica IN (SELECT id_atletica FROM EsportesAtletica WHERE id_esporte = @p2)";
            return _context.Competidores
                .FromSqlRaw(sql, idTime1.Value, idTime2.Value, idEsporte.Value)
                .AsEnumerable();
        }
        return Enumerable.Empty<Competidor>();
    }

    public Competidor? Update(string matricula, UpdateCompetidorViewModel upComp)
    {

        var UpdtdComp = _context.Competidores
                            .FromSqlRaw(

                                @"
                                    UPDATE Competidor
                                    SET nome = @p0, id_atletica = @p1
                                    WHERE matricula = @p2
                                    RETURNING *
                                ",

                                upComp.Nome,
                                upComp.Id_atletica,
                                matricula
                            )
                            .AsEnumerable()
                            .FirstOrDefault();

        return UpdtdComp;
    }

    public Competidor? Delete(string matricula)
    {

        var dltdComp = _context.Competidores
                            .FromSqlRaw(
                                @"
                                DELETE FROM Competidor
                                WHERE matricula = @p0
                                RETURNING *
                                ",
                                matricula
                            )
                            .AsEnumerable()
                            .FirstOrDefault();

        return dltdComp;
    }

    public CompetidorScreenViewModel? CompetidorFinder(string id_competidor)
    {

        var competidor = _context.Competidores
            .FromSqlRaw(
                @"SELECT * FROM Competidor WHERE matricula = @p0",
                id_competidor
                ).FirstOrDefault();

        competidor.Atletica = _context.Atleticas
            .FromSqlRaw(
                @"SELECT * FROM atletica
                WHERE id = @p0",
                competidor.Id_atletica
            ).FirstOrDefault();

        if (competidor == null)
            return null;

        var listMatches = _matchServ.LastResults(competidor.Id_atletica);

        List<Tuple<string, string, int, int, float>> lastMatches = new List<Tuple<string, string, int, int, float>>();

        foreach (var match in listMatches)
        {

            lastMatches.Add(
                Tuple.Create(
                    match.Item2,
                    match.Item3,
                    match.Item4,
                    match.Item5,
                    CalcNota(id_competidor, match.Item1)
                )
            );
        }

        var compsScreen = new CompetidorScreenViewModel(
            competidor.Nome,
            competidor.Matricula,
            competidor.Atletica.Nome,
            lastMatches
        );

        return compsScreen;
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
                nota += estat.Action.Points * estat.QtdAcoes;
                qtd += estat.QtdAcoes;
            }
        }

        return (qtd > 0) ? nota / qtd : 0;
    }
}
