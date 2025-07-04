namespace Backend.ViewModels;

public class DefaultAtheticViewModel
{
    public DefaultAtheticViewModel(int id, string nome, string? logo = null)
    {
        Id = id;
        Nome = nome;
        Logo = logo;
    }
    public int Id { get; set; }
    public string Nome { get; set; }
    public string? Logo { get; set; }
}