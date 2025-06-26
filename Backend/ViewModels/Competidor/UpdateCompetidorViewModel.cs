namespace Backend.ViewModels;

public class UpdateCompetidorViewModel
{
    public string Nome { get; set; }
    public int Id_atletica { get; set; }

    public UpdateCompetidorViewModel(string nome, int id_atletica)
    {

        Nome = nome;
        Id_atletica = id_atletica;
    }
}