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
