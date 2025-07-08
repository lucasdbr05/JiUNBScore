using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("partidas")]
public class Match
{
    public Match(
        int? placar_time_1,
        int? placar_time_2,
        int id_edicao,
        int id_esporte,
        int id_fase,
        int id_local,
        int id_time_1,
        int id_time_2,
        DateTime data
    )
    {
        Placar_time_1 = placar_time_1;
        Placar_time_2 = placar_time_2;
        Id_edicao = id_edicao;
        Id_esporte = id_esporte;
        Id_fase = id_fase;
        Id_local = id_local;
        Id_time_1 = id_time_1;
        Id_time_2 = id_time_2;
        Data = data;
    }

    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("placar_time_1")]
    public int? Placar_time_1 { get; set; }

    [Column("placar_time_2")]
    public int? Placar_time_2 { get; set; }

    [Column("id_edicao")]
    public int Id_edicao { get; set; }
    [Column("id_esporte")]
    public int Id_esporte { get; set; }

    [Column("id_fase")]
    public int Id_fase { get; set; }

    [Column("id_local")]
    public int Id_local { get; set; }

    [Column("id_time_1")]
    public int Id_time_1 { get; set; }

    [Column("id_time_2")]
    public int Id_time_2 { get; set; }
    
    [Column("date")]
    public DateTime Data { get; set; }

    [ForeignKey("Id_edicao")]
    public Edicao? Edicao { get; set; }

    [ForeignKey("Id_fase")]
    public Fase? Fase { get; set; }

    [ForeignKey("Id_local")]
    public Local? Local { get; set; }

    [ForeignKey("Id_time_1")]
    public Atletica? Time_1 { get; set; }

    [ForeignKey("Id_time_2")]
    public Atletica? Time_2 { get; set; }
}