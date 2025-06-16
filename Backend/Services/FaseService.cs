using System;
using System.Text;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.ViewModels;
using Backend.Entities;
namespace Backend.Services;


public class FaseService
{
    private readonly JiunbDBContext _context;
    private readonly IConfiguration _config;

    public FaseService(JiunbDBContext dBContext, IConfiguration config)
    {
        _context = dBContext;
        _config = config;
    }

    public Fase Create(CreateFaseViewModel data)
    {
    
        var fase = _context.Fases
            .FromSqlRaw(
                @"
                INSERT INTO Fase (ordem, nome_grupo, nome_etapa)
                VALUES (@p0, @p1, @p2)
                RETURNING id, ordem, nome_grupo, nome_etapa",
                data.Ordem, data.NomeGrupo, data.NomeEtapa
            )
            .AsEnumerable()
            .FirstOrDefault();

        return fase;   
    }

    public IEnumerable<Fase> FindAll()
    {
        return _context.Fases
            .FromSqlRaw(@"SELECT id, ordem, nome_grupo, nome_etapa FROM Fase")
            .AsEnumerable();
    }

    public Fase FindOne(int id)
    {
        return _context.Fases
            .FromSqlRaw(
                @"SELECT id, ordem, nome_grupo, nome_etapa FROM Fase WHERE id = @p0",
                id
            )
            .AsEnumerable()
            .FirstOrDefault();
    }

    public Fase Update(int id, CreateFaseViewModel data)
    {
        var fase = _context.Fases
            .FromSqlRaw(
                @"
                UPDATE Fase
                SET ordem = @p1, nome_grupo = @p2, nome_etapa = @p3
                WHERE id = @p0
                RETURNING id, ordem, nome_grupo, nome_etapa",
                id, data.Ordem, data.NomeGrupo, data.NomeEtapa
            )
            .AsEnumerable()
            .FirstOrDefault();

        return fase;
    }

    public Fase Delete(int id)
    {
        var fase = _context.Fases
            .FromSqlRaw(
                @"
                DELETE FROM Fase
                WHERE id = @p0
                RETURNING id, ordem, nome_grupo, nome_etapa",
                id
            )
            .AsEnumerable()
            .FirstOrDefault();

        return fase;
    }

}