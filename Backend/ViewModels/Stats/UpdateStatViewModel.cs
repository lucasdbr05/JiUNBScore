namespace Backend.ViewModels;

public class UpdateStatViewModel
{

    public int Qtd_acoes { get; set; }
    public int Id_acao { get; set; }
    public string Id_competidor { get; set; }
    public int Id_partida { get; set; }

    public UpdateStatViewModel(
        int qtd_acoes,
        int id_acao,
        string id_competidor,
        int id_partida
    )
    {

        Qtd_acoes = qtd_acoes;
        Id_acao = id_acao;
        Id_competidor = id_competidor;
        Id_partida = id_partida;
    }
}