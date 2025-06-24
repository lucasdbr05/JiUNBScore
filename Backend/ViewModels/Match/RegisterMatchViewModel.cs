namespace Backend.ViewModels;

public class RegisterMatchViewModel
{
    public RegisterMatchViewModel(
        int placarTime1,
        int placarTime2,
        int idEdicao,
        int idFase,
        int idLocal,
        int idTime1,
        int idTime2,
        DateTime date
    )
    {
        PlacarTime1 = placarTime1;
        PlacarTime2 = placarTime2;
        IdEdicao = idEdicao;
        IdFase = idFase;
        IdLocal = idLocal;
        IdTime1 = idTime1;
        IdTime2 = idTime2;
        Date = date;
    }

    public int PlacarTime1 { get; set; }
    public int PlacarTime2 { get; set; }
    public int IdEdicao { get; set; }
    public int IdFase { get; set; }
    public int IdLocal { get; set; }
    public int IdTime1 { get; set; }
    public int IdTime2 { get; set; }
    public DateTime Date { get; set; }
}