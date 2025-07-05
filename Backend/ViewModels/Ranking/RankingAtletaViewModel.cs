namespace Backend.ViewModels;

public class RankingAtletaViewModel
{
    public string AtletaId { get; set; }
    public string AtletaNome { get; set; }
    public string AtleticaNome { get; set; }
    public double Ranking { get; set; }

    public RankingAtletaViewModel(string atletaId, string atletaNome, string atleticaNome, double ranking)
    {
        AtletaId = atletaId;
        AtletaNome = atletaNome;
        AtleticaNome = atleticaNome;
        Ranking = ranking;
    }
}
