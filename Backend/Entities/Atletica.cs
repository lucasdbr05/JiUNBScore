using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("atletica")]
public class Atletica
{
    public Atletica(int id, string nome, byte[] logo)
    {
        Id = id;
        Nome = nome;
        Logo = logo;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; }

    [Column("logo")]
    public Byte[] Logo { get; set; }
}