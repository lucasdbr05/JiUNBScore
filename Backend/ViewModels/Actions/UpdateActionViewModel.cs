namespace Backend.ViewModels;

public class UpdateActionViewModel
{

    public string Nome { get; set; }
    public int Points { get; set; }
    public int Id_esporte { get; set; }

    public UpdateActionViewModel(string nome, int points, int id_esporte)
    {
        Nome = nome;
        Points = points;
        Id_esporte = id_esporte;
    }
}