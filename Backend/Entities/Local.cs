using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("Local")]
public class Local
{
    public Local(int id, string ra, string cep, string quadra, string rua, string lote)
    {
        Id = id;
        Ra = ra;
        Cep = cep;
        Quadra = quadra;
        Rua = rua;
        Lote = lote;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("ra")]
    public string Ra { get; set; }

    [Column("cep")]
    public string Cep { get; set; }

    [Column("quadra")]
    public string Quadra { get; set; }

    [Column("rua")]
    public string Rua { get; set; }

    [Column("lote")]
    public string Lote { get; set; }
}