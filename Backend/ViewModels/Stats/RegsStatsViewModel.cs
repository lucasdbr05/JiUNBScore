namespace Backend.ViewModels;

public class RegsStatsViewModel
{

    public int Qtd_acoes { get; set; }
    public int Id_partida { get; set; }
    public int Id_acao { get; set; }
    public string Id_competidor { get; set; }

    public RegsStatsViewModel
    (
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
}