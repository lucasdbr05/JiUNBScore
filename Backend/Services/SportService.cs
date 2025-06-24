using Backend.Contexts;
using Backend.Entities;
using Backend.ViewModels.Sport;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Data;

namespace Backend.Services;

public class SportService
{
    private readonly JiunbDBContext _context;
    private readonly string _connectionString;
    public SportService(JiunbDBContext context, IConfiguration configuration)
    {
        _context = context;
        _connectionString = configuration.GetConnectionString("DefaultConnection")!;
    }

    public async Task<List<Esporte>> GetAllAsync()
    {
        var esportes = new List<Esporte>();
        using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();
        using var cmd = new NpgsqlCommand("SELECT id, nome FROM esportes", conn);
        using var reader = await cmd.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            esportes.Add(new Esporte(reader.GetInt32(0), reader.GetString(1)));
        }
        return esportes;
    }

    public async Task<Esporte?> GetByIdAsync(int id)
    {
        using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();
        using var cmd = new NpgsqlCommand("SELECT id, nome FROM esportes WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("@id", id);
        using var reader = await cmd.ExecuteReaderAsync();
        if (await reader.ReadAsync())
        {
            return new Esporte(reader.GetInt32(0), reader.GetString(1));
        }
        return null;
    }

    public async Task<Esporte> CreateAsync(CreateSportViewModel model)
    {
        using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();
        using var cmd = new NpgsqlCommand("INSERT INTO esportes (nome) VALUES (@nome) RETURNING id;", conn);
        cmd.Parameters.AddWithValue("@nome", model.Nome);
        var id = (int)await cmd.ExecuteScalarAsync();
        return new Esporte(id, model.Nome);
    }

    public async Task<Esporte?> UpdateAsync(UpdateSportViewModel model)
    {
        using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();
        using var cmd = new NpgsqlCommand("UPDATE esportes SET nome = @nome WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("@id", model.Id);
        cmd.Parameters.AddWithValue("@nome", model.Nome);
        var rows = await cmd.ExecuteNonQueryAsync();
        if (rows == 0) return null;
        return new Esporte(model.Id, model.Nome);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var conn = new NpgsqlConnection(_connectionString);
        await conn.OpenAsync();
        using var cmd = new NpgsqlCommand("DELETE FROM esportes WHERE id = @id", conn);
        cmd.Parameters.AddWithValue("@id", id);
        var rows = await cmd.ExecuteNonQueryAsync();
        return rows > 0;
    }
}
