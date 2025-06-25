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
        Placar_time_1 = placarTime1;
        Placar_time_2 = placarTime2;
        Id_edicao = idEdicao;
        Id_fase = idFase;
        Id_local = idLocal;
        Id_time_1 = idTime1;
        Id_time_2 = idTime2;
        Data = date;
    }

    public int Placar_time_1 { get; set; }
    public int Placar_time_2 { get; set; }
    public int Id_edicao { get; set; }
    public int Id_fase { get; set; }
    public int Id_local { get; set; }
    public int Id_time_1 { get; set; }
    public int Id_time_2 { get; set; }
    public DateTime Data { get; set; }
}