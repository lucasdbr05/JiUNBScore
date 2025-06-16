namespace Backend.ViewModels;

public class CreateFaseViewModel
{
    public CreateFaseViewModel(int ordem, string nomeGrupo, string nomeEtapa)
    {
        Ordem = ordem;
        NomeGrupo = nomeGrupo;
        NomeEtapa = nomeEtapa;
    }
    public int Ordem { get; set; }
    public string NomeGrupo { get; set; }
    public string NomeEtapa { get; set; }
}