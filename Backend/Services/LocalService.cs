using Backend.Contexts;
using Backend.Controllers;
using Backend.ViewModels;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class LocalService
{

    public readonly JiunbDBContext _context;

    public LocalService(JiunbDBContext context)
    {
        _context = context;
    }

    public IEnumerable<Local> FindAll()
    {

        return _context.Locais
            .FromSqlRaw(
                @"
                SELECT * FROM local
                "
            ).AsEnumerable();
    }

    public Local? FindOne(int id)
    {
        return _context.Locais
            .FromSqlRaw(
                @"
                SELECT * FROM local
                WHERE id = @p0
                ",
                id
            ).FirstOrDefault();
    }
    public Local? Create(RegisterLocalViewModel regsLocal)
    {

        var result = _context.Locais
            .FromSqlRaw(
                @"
                    SELECT * FROM local
                    WHERE cep = @p0
                ",
                regsLocal.Cep
            ).FirstOrDefault();

        if (result != null) return null;

        result = _context.Locais
            .FromSqlRaw(
                @"
                    INSERT INTO local(
                        ra,
                        cep,
                        quadra,
                        rua,
                        lote
                    )
                    VALUES (@p0, @p1, @p2, @p3, @p4)
                    RETURNING *
                ",
                regsLocal.Ra,
                regsLocal.Cep,
                regsLocal.Quadra,
                regsLocal.Rua,
                regsLocal.Lote
            ).AsEnumerable().FirstOrDefault();

        return result;
    }

    public Local? Update(int id, UpdateLocalViewModel updtLocal)
    {

        return _context.Locais
            .FromSqlRaw(
                @"
                    UPDATE local
                    SET
                    cep = @p0, ra = @p1, lote = @p2, quadra = @p3, rua = @p4
                    WHERE id = @p5
                    RETURNING *
                ",
                updtLocal.Cep,
                updtLocal.Ra,
                updtLocal.Lote,
                updtLocal.Quadra,
                updtLocal.Rua,
                id
            ).AsEnumerable().FirstOrDefault();
    }

    public Local? Delete(int id)
    {

        return _context.Locais
            .FromSqlRaw(
                @"
                    DELETE FROM local 
                    WHERE id = @p0
                    RETURNING *
                ",
                id
            ).AsEnumerable().FirstOrDefault();
    }
}