using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("Esportes")]
public class Esporte
{
    public Esporte(int id, string nome)
    {
        Id = id;
        Nome = nome;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; }

}