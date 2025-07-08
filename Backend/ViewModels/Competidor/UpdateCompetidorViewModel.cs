namespace Backend.ViewModels;

public class UpdateCompetidorViewModel
{
    public string Nome { get; set; }
    public int IdAtletica { get; set; }

    public UpdateCompetidorViewModel(string nome, int idAtletica)
    {

        Nome = nome;
        IdAtletica = idAtletica;
    }
}