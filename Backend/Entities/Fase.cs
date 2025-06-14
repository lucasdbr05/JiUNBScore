using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("Fase")]
public class Fase
{
    public Fase(int id, int grupo, string nome)
    {
        Id = id;
        Grupo = grupo;
        Nome = nome;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("grupo")]
    public int Grupo { get; set; }

    [Column("nome")]
    public string Nome { get; set; }
}