using Microsoft.EntityFrameworkCore;
using Backend.Entities;
namespace Backend.Contexts;

public class JiunbDBContext : DbContext
{
    public JiunbDBContext(DbContextOptions<JiunbDBContext> options)
        : base(options) {}
        
    public DbSet<User> Users { get; set; }
}