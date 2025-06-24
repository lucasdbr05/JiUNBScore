using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("estatisticas")]
public class Estatisticas
{
    public Estatisticas(
        int qtd_acoes,
        int id_partida,
        int id_acao,
        string id_competidor
    )
    {
        Qtd_acoes = qtd_acoes;
        Id_partida = id_partida;
        Id_acao = id_acao;
        Id_competidor = id_competidor;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("qtd_acoes")]
    public int Qtd_acoes { get; set; }

    [Column("id_partida")]
    public int Id_partida { get; set; }

    [ForeignKey("id_partida")]
    public Match? Match { get; set; }

    [Column("id_acao")]
    public int Id_acao { get; set; }

    [ForeignKey("id_acao")]
    public Action? Action { get; set; }

    [Column("id_competidor")]
    public string Id_competidor { get; set; }

    [ForeignKey("id_competidor")]
    public Competidor? Competidor { get; set; }
}