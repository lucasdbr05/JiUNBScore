using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("estatisticas")]
public class Estatisticas
{
    public Estatisticas(
        int qtdAcoes,
        int idPartida,
        int idAcao,
        string idCompetidor
    )
    {
        QtdAcoes = qtdAcoes;
        IdPartida = idPartida;
        IdAcao = idAcao;
        IdCompetidor = idCompetidor;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("qtd_acoes")]
    public int QtdAcoes { get; set; }

    [Column("id_partida")]
    public int IdPartida { get; set; }

    [ForeignKey("id_partida")]
    public Match? Match { get; set; }

    [Column("id_acao")]
    public int IdAcao { get; set; }

    [ForeignKey("id_acao")]
    public Action? Action { get; set; }

    [Column("id_competidor")]
    public string IdCompetidor { get; set; }

    [ForeignKey("id_competidor")]
    public Competidor? Competidor { get; set; }
}