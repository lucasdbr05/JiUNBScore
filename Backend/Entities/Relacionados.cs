using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("relacionados")]
public class Relacionados
{
    public Relacionados(
        int id,
        string funcao,
        int numero,
        string id_competidor
    )
    {
        Id = id;
        Funcao = funcao;
        Numero = numero;
        Id_competidor = id_competidor;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("funcao")]
    public string Funcao { get; set; }

    [Column("numero")]
    public int Numero { get; set; }
    [Column("id_competidor")]
    public string Id_competidor { get; set; }

    [ForeignKey("Id_competidor")]
    public Competidor? Competidor { get; set; }
}