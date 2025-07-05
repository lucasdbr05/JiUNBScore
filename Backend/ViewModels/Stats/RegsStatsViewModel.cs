namespace Backend.ViewModels;

public class RegsStatsViewModel
{

    public int QtdAcoes { get; set; }
    public int IdPartida { get; set; }
    public int IdAcao { get; set; }
    public string IdCompetidor { get; set; }

    public RegsStatsViewModel
    (
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
}