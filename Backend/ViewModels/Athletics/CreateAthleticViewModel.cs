namespace Backend.ViewModels;

public class CreateAthleticViewModel
{
    public CreateAthleticViewModel(string nome, string? logo = null)
    {
        Nome = nome;
        Logo = logo;
    }

    public string Nome { get; set; }
    public string? Logo { get; set; }
}