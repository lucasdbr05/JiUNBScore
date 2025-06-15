using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("edicao")]
public class Edicao
{
    public Edicao(int id, DateTime data_fim, DateTime data_comeco)
    {
        Id = id;
        Data_fim = data_fim;
        Data_comeco = data_comeco;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("data_fim")]
    public DateTime Data_fim { get; set; }

    [Column("data_comeco")]
    public DateTime Data_comeco { get; set; }
}