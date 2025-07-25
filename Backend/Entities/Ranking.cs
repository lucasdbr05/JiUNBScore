using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("ranking_atletas")]
public class Ranking
{
    public Ranking(
        string atletaId,
        string atletaNome,
        string atleticaNome,
        int edicaoId,
        int esporteId,
        double pontuacao
    )
    {
        AtletaId = atletaId;
        AtletaNome = atletaNome;
        AtleticaNome = atleticaNome;
        EdicaoId = edicaoId;
        EsporteId = esporteId;
        Pontuacao = pontuacao;
    }

    public Ranking() { }

    [Column("atleta_id")]
    public string AtletaId { get; set; }

    [Column("atleta_nome")]
    public string AtletaNome { get; set; }

    [Column("atletica_nome")]
    public string AtleticaNome { get; set; }

    [Column("edicao_id")]
    public int EdicaoId { get; set; }

    [Column("esporte_id")]
    public int EsporteId { get; set; }

    [Column("ranking")]
    public double Pontuacao { get; set; }
}
