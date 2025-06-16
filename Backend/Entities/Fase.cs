using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("fase")]
public class Fase
{
    public Fase(int id, int ordem, string nomeEtapa, string nomeGrupo)
    {
        Id = id;
        Ordem = ordem;
        NomeEtapa= nomeEtapa;
        NomeGrupo = nomeGrupo;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("ordem")]
    public int Ordem { get; set; }

    [Column("nome_grupo")]
    public int NomeGrupo { get; set; }

    [Column("nome_etapa")]
    public string NomeEtapa { get; set; }
}   