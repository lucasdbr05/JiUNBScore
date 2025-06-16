using Backend.Entities;

namespace Backend.ViewModels;

public class CompetidorScreenViewModel
{

    public string Atletica { get; set; }
    public string Nome { get; set; }
    public List<string> Edicoes { get; set; }

    public List<Tuple<string, string, Byte[], Byte[], int, int, float>> UltimasPartidas { get; set; }

    public CompetidorScreenViewModel(
        string nome,
        List<string> edicoes,
        string atletica,
        List<Tuple<string, string, Byte[], Byte[], int, int, float>> lastMatches
        )
    {

        Nome = nome;
        Edicoes = edicoes;
        Atletica = atletica;
        UltimasPartidas = lastMatches;
    }
}