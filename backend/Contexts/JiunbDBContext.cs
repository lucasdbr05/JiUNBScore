using Microsoft.EntityFrameworkCore;
namespace Backend.Contexts;

public class JiUnBDotnetContext : DbContext {
    public JiUnBDotnetContext(DbContextOptions<JiUnBDotnetContext> options) 
        : base(options) {}

}