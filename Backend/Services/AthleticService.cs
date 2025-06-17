using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Backend.Contexts;
using Backend.Entities;
using Backend.ViewModels;

namespace Backend.Services
{
    public class AthleticService
    {
        private readonly JiunbDBContext _context;

        public AthleticService(JiunbDBContext context)
        {
            _context = context;
        }

        public Atletica Create(CreateAthleticViewModel data)
        {
            var atletica = _context.Atleticas
                .FromSqlRaw(
                    @"INSERT INTO Atletica (nome, logo) VALUES (@p0, @p1) RETURNING id, nome, logo",
                    data.Nome, data.Logo
                )
                .AsEnumerable()
                .FirstOrDefault();
            return atletica;
        }

        public IEnumerable<Atletica> FindAll()
        {
            return _context.Atleticas
                .FromSqlRaw("SELECT id, nome, logo FROM Atletica")
                .AsEnumerable();
        }

        public Atletica FindOne(int id)
        {
            return _context.Atleticas
                .FromSqlRaw("SELECT id, nome, logo FROM Atletica WHERE id = @p0", id)
                .AsEnumerable()
                .FirstOrDefault();
        }

        public Atletica Update(UpdateAthleticViewModel data)
        {
            var atletica = _context.Atleticas
                .FromSqlRaw(
                    @"UPDATE Atletica SET nome = @p1, logo = @p2 WHERE id = @p0 RETURNING id, nome, logo",
                    data.Id, data.Nome, data.Logo
                )
                .AsEnumerable()
                .FirstOrDefault();
            return atletica;
        }

        public Atletica Delete(int id)
        {
            var atletica = _context.Atleticas
                .FromSqlRaw(
                    @"DELETE FROM Atletica WHERE id = @p0 RETURNING id, nome, logo",
                    id
                )
                .AsEnumerable()
                .FirstOrDefault();
            return atletica;
        }
    }
}
