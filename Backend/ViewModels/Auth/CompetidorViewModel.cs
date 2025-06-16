using Backend.Entities;

namespace Backend.ViewModels;

public class CompetidorViewModel
{

    public string Atletica { get; set; }
    public string Nome { get; set; }
    public List<string> Edicoes { get; set; }
    public List<Tuple<string, string, Byte[], Byte[], int, int, int>> UltimasPartidas { get; set; }
    // Opcional caso ele seja treinador
    public string Role { get; set; }
    public int? Numero { get; set; }

    // Construtor para um jogador (ele pode jogar em varios esportes n?)
    // Solução: duplica seu registro na tabela pra cada esporte

    public CompetidorViewModel(
        string nome,
        List<string> edicoes,
        string atletica,
        string role,
        int numero,
        List<Tuple<string, string, Byte[], Byte[], int, int, int>> lastMatches
        )
    {

        Nome = nome;
        Edicoes = edicoes;
        Atletica = atletica;
        Role = role;
        Numero = numero;
        UltimasPartidas = lastMatches;
    }

    // Construtor para um treinador (ele só pode ser treinador uma vez?)
    // solução: duplica seu registro para cada vez que ele diferenciar sua role

    public CompetidorViewModel(
        string nome,
        List<string> edicoes,
        string atletica,
        string role,
        List<Tuple<string, string, Byte[], Byte[], int, int, int>> lastMatches
        )
    {

        Nome = nome;
        Edicoes = edicoes;
        Atletica = atletica;
        Role = role;
        UltimasPartidas = lastMatches;
    }
}