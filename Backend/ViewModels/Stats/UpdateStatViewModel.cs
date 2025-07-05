namespace Backend.ViewModels;

public class UpdateStatViewModel
{

    public int QtdAcoes { get; set; }
    public int IdAcao { get; set; }
    public string IdCompetidor { get; set; }
    public int IdPartida { get; set; }

    public UpdateStatViewModel(
        int qtdAcoes,
        int idAcao,
        string idCompetidor,
        int idPartida
    )
    {
        QtdAcoes = qtdAcoes;
        IdAcao = idAcao;
        IdCompetidor = idCompetidor;
        IdPartida = idPartida;
    }
}