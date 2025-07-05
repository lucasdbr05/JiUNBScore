using Backend.ViewModels;
using Microsoft.EntityFrameworkCore;
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
        var result = _context.Set<RankingAtletaViewModel>()
            .FromSqlRaw(@"
            SELECT atleta_id, atleta_nome, atletica_nome, ranking 
            FROM ranking_atletas WHERE edicao_id = @p0 
            ORDER BY ranking DESC", edicaoId)
            .ToList();
        return result;
    }
}
