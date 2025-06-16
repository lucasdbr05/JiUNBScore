namespace Backend.ViewModels;

public class RegsCompetidorViewModel
{

    public string Nome { get; set; }
    public string Matricula { get; set; }
    public int Id_atletica { get; set; }

    public RegsCompetidorViewModel
    (
        string nome,
        string matricula,
        int id_atletica
    )
    {

        Nome = nome;
        Matricula = matricula;
        Id_atletica = id_atletica;
    }
}