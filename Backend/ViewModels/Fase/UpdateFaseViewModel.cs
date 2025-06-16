namespace Backend.ViewModels;

public class UpdateFaseViewModel
{
    public UpdateFaseViewModel(int id, int ordem, string nomeGrupo, string nomeEtapa)
    {
        id = id;
        Ordem = ordem;
        NomeGrupo = nomeGrupo;
        NomeEtapa = nomeEtapa;
    }
    public int Id { get; set; }
    public int Ordem { get; set; }
    public string NomeGrupo { get; set; }
    public string NomeEtapa { get; set; }
}