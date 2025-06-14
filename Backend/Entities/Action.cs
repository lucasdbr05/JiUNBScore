using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("Acao")]
public class Action
{
    public Action(int id, string nome, int points, int id_esporte)
    {
        Id = id;
        Nome = nome;
        Points = points;
        Id_esporte = id_esporte;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; }

    [Column("pontuacao")]
    public int Points { get; set; }

    [Column("id_esporte")]
    public int Id_esporte { get; set; }

    [ForeignKey("Id_esporte")]
    public Esporte? Esporte { get; set; }
}