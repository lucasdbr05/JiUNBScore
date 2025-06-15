using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("competidor")]
public class Competidor
{
    public Competidor(string matricula, string nome, int id_atletica)
    {
        Matricula = matricula;
        Nome = nome;
        Id_atletica = id_atletica;
    }

    [Key]
    [Column("matricula")]
    public string Matricula { get; set; }

    [Column("nome")]
    public string Nome { get; set; }

    [Column("id_atletica")]
    public int Id_atletica { get; set; }

    [ForeignKey("Id_atletica")]
    public Atletica? Atletica{ get; set; }
}