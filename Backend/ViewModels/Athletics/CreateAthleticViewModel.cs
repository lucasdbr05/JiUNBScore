namespace Backend.ViewModels;

public class CreateAthleticViewModel
{
    public CreateAthleticViewModel(string nome, byte[]? logo = null)
    {
        Nome = nome;
        Logo = logo;
    }

    public string Nome { get; set; }
    public byte[]? Logo { get; set; }
}