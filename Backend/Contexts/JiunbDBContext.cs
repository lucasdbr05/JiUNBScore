using Microsoft.EntityFrameworkCore;
using Backend.Entities;
namespace Backend.Contexts;

public class JiunbDBContext : DbContext
{
    public JiunbDBContext(DbContextOptions<JiunbDBContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Entities.Action> Actions { get; set; }
    public DbSet<Atletica> Atleticas { get; set; }
    public DbSet<Competidor> Competidores { get; set; }
    public DbSet<Edicao> Edicoes { get; set; }
    public DbSet<Esporte> Esportes { get; set; }
    public DbSet<Escalacao> Escalacoes { get; set; }
    public DbSet<Fase> Fases { get; set; }
    public DbSet<Local> Locais { get; set; }
    public DbSet<Estatisticas> Estatisticas { get; set; }
    public DbSet<Match> Matches { get; set; }
    public DbSet<Relacionados> Relacionados { get; set; }
    public DbSet<Ranking> Ranking { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Ranking>().HasNoKey();
    }
}