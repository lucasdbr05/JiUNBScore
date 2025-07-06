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

        public DefaultAtheticViewModel Create(CreateAthleticViewModel data)
        {
            var logoBytes = Base64ToBytes(data.Logo);
            var atletica = _context.Atleticas
                .FromSqlRaw(
                    @"INSERT INTO Atletica (nome, logo) VALUES (@p0, @p1) RETURNING id, nome, logo",
                    data.Nome, logoBytes
                )
                .AsEnumerable()
                .FirstOrDefault();
            return atletica != null ? ToDefaultViewModel(atletica) : null;
        }

        public IEnumerable<DefaultAtheticViewModel> FindAll()
        {
            return _context.Atleticas
                .FromSqlRaw("SELECT id, nome, logo FROM Atletica")
                .AsEnumerable()
                .Select(a => ToDefaultViewModel(a));
        }

        public DefaultAtheticViewModel FindOne(int id)
        {
            var atletica = _context.Atleticas
                .FromSqlRaw("SELECT id, nome, logo FROM Atletica WHERE id = @p0", id)
                .AsEnumerable()
                .FirstOrDefault();
            return atletica != null ? ToDefaultViewModel(atletica) : null;
        }

        public DefaultAtheticViewModel Update(UpdateAthleticViewModel data)
        {
            var logoBytes = Base64ToBytes(data.Logo);
            var atletica = _context.Atleticas
                .FromSqlRaw(
                    @"UPDATE Atletica SET nome = @p1, logo = @p2 WHERE id = @p0 RETURNING id, nome, logo",
                    data.Id, data.Nome, logoBytes
                )
                .AsEnumerable()
                .FirstOrDefault();
            return atletica != null ? ToDefaultViewModel(atletica) : null;
        }

        public DefaultAtheticViewModel Delete(int id)
        {
            var atletica = _context.Atleticas
                .FromSqlRaw(
                    @"DELETE FROM Atletica WHERE id = @p0 RETURNING id, nome, logo",
                    id
                )
                .AsEnumerable()
                .FirstOrDefault();
            return atletica != null ? ToDefaultViewModel(atletica) : null;
        }
        private static DefaultAtheticViewModel ToDefaultViewModel(Atletica a)
        {
            return new DefaultAtheticViewModel(
                a.Id,
                a.Nome,
                BytesToBase64(a.Logo)
            );
        }

        public static byte[] Base64ToBytes(string base64)
        {
            if (string.IsNullOrEmpty(base64)) return null;
            var clean =  base64.Split(',')[1];
            return Convert.FromBase64String(clean);
        }

        public static string BytesToBase64(object logo)
        {
            if (logo is byte[] bytes && bytes.Length > 0)
                return "data:image/png;base64," + Convert.ToBase64String(bytes);
            return null;
        }
    }
}
