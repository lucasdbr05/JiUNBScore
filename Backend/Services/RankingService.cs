using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;
using System.Collections.Generic;
using System.Linq;


namespace Backend.Services;

public class RankingService
{
    private readonly JiunbDBContext _context;
    public RankingService(JiunbDBContext context)
    {
        _context = context;
    }

    public List<RankingAtletaViewModel> GetRankingByEdition(int edicaoId, int sportId)
    {
        var result = _context.Ranking
            .FromSqlRaw(@"
            SELECT atleta_id, atleta_nome, atletica_nome, ranking, edicao_id, esporte_id
            FROM ranking_atletas 
            WHERE edicao_id = @p0 AND esporte_id = @p1
            ORDER BY ranking DESC",
            edicaoId, sportId)
            .ToList();

        return result.Select(r => new RankingAtletaViewModel(
            r.AtletaId,
            r.AtletaNome,
            r.AtleticaNome,
            r.Pontuacao
        )).ToList();
    }
}
