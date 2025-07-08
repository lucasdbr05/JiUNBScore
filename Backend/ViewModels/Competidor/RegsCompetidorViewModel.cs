namespace Backend.ViewModels;

public class RegsCompetidorViewModel
{

    public string Nome { get; set; }
    public string Matricula { get; set; }
    public int IdAtletica { get; set; }

    public RegsCompetidorViewModel
    (
        string nome,
        string matricula,
        int idAtletica
    )
    {

        Nome = nome;
        Matricula = matricula;
        IdAtletica = idAtletica;
    }
}