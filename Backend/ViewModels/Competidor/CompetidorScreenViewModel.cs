using Backend.Entities;

namespace Backend.ViewModels;

public class CompetidorScreenViewModel
{

    public string Atletica { get; set; }
    public string Nome { get; set; }
    public string Matr { get; set; }

    public List<Tuple<string, string, Byte[], Byte[], int, int, float>> UltimasPartidas { get; set; }

    public CompetidorScreenViewModel(
        string nome,
        string matricula,
        string atletica,
        List<Tuple<string, string, Byte[], Byte[], int, int, float>> lastMatches
        )
    {

        Nome = nome;
        Matr = matricula;
        Atletica = atletica;
        UltimasPartidas = lastMatches;
    }
}