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

    public List<RankingAtletaViewModel> GetRankingByEdition(int edicaoId)
    {
        var result = _context.Ranking
            .FromSqlRaw(@"
            SELECT atleta_id, atleta_nome, atletica_nome, ranking, edicao_id
            FROM ranking_atletas WHERE edicao_id = @p0 
            ORDER BY ranking DESC", edicaoId)
            .ToList();

        return result.Select(r => new RankingAtletaViewModel(
            r.AtletaId,
            r.AtletaNome,
            r.AtleticaNome,
            r.Pontuacao
        )).ToList();
    }
}
