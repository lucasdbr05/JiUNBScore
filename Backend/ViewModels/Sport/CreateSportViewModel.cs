namespace Backend.ViewModels.Sport;

public class CreateSportViewModel
{
    CreateSportViewModel(string nome)
    {
        Nome = nome;
    }
    public string Nome { get; set; } = string.Empty;
}
