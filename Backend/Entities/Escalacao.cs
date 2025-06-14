using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("Escalacao")]
public class Escalacao
{
    public Escalacao(
        int id,
        bool is_titular,
        int id_partida
    )
    {
        Id = id;
        Is_titular = is_titular;
        Id_partida = id_partida;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("is_titular")]
    public bool Is_titular { get; set; }

    [Column("id_partida")]
    public int Id_partida { get; set; }

    [ForeignKey("Id_partida")]
    public Match? Match { get; set; }
}