namespace Backend.ViewModels.Sport;

public class UpdateSportViewModel
{
    UpdateSportViewModel(int id, string? nome)
    {
        Id = id;
        Nome = nome;
    }
    public int Id { get; set; }
    public string? Nome { get; set; } = string.Empty;
}
