using System.Net.WebSockets;
using Backend.Contexts;
using Backend.Entities;
using Backend.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class ActionService
{

    public readonly JiunbDBContext _context;

    public ActionService(JiunbDBContext context)
    {

        _context = context;
    }

    public IEnumerable<Backend.Entities.Action> FindPEsporte(int id_esporte)
    {

        var results = _context.Actions
            .FromSqlRaw(
                @"
                SELECT * FROM acao
                WHERE id_esporte = @p0
                ",
                id_esporte
            ).AsEnumerable().ToList();

        for (int i = 0; i < results.Count(); i++)
            Instantiate(results[i]);

        return results.AsEnumerable();
    }
    
    public IEnumerable<Backend.Entities.Action> FindAll()
    {

        var results = _context.Actions
            .FromSqlRaw(
                @"
                SELECT * FROM acao
                "
            ).AsEnumerable().ToList();

        for (int i = 0; i < results.Count(); i++)
            Instantiate(results[i]);

        return results.AsEnumerable();
    }

    public Backend.Entities.Action? FindOne(int id)
    {

        var result = _context.Actions
            .FromSqlRaw(
                @"
                SELECT * FROM acao
                WHERE id = @p0
                ",
                id
            ).FirstOrDefault();

        if (result == null) return result;

        Instantiate(result);

        return result;
    }

    public Backend.Entities.Action? Create(RegisterActionViewModel regsAct)
    {

        return _context.Actions
            .FromSqlRaw(
                @"INSERT INTO acao(
                    nome,
                    pontuacao,
                    id_esporte
                ) VALUES (@p0, @p1, @p2)
                RETURNING *
                ",
                regsAct.Nome,
                regsAct.Points,
                regsAct.Id_esporte
            ).AsEnumerable().FirstOrDefault();
    }

    public Backend.Entities.Action? Update(int id, UpdateActionViewModel updtAct)
    {

        return _context.Actions
            .FromSqlRaw(
                @"
                UPDATE acao 
                SET nome = @p0, pontuacao = @p1, id_esporte = @p2
                WHERE id = @p3
                RETURNING *
                ",
                updtAct.Nome,
                updtAct.Points,
                updtAct.Id_esporte,
                id
            ).AsEnumerable().FirstOrDefault();
    }
    
    public Backend.Entities.Action? Delete(int id)
    {

        return _context.Actions
            .FromSqlRaw(
                @"
                DELETE FROM acao
                WHERE id = @p0
                RETURNING *
                ",
                id
            ).AsEnumerable().FirstOrDefault();
    }

    private void Instantiate(Backend.Entities.Action action)
    {

        action.Esporte = _context.Esportes
            .FromSqlRaw(
                @"
                SELECT * FROM esportes
                WHERE id = @p0
                ",
                action.Id_esporte
            ).FirstOrDefault();
    }
}