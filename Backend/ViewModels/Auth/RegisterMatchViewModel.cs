namespace Backend.ViewModels;

public class RegisterMatchViewModel
{

    public RegisterMatchViewModel(
        int placar_time_1,
        int placar_time_2,
        int id_edicao,
        int id_fase,
        int id_local,
        int id_time_1,
        int id_time_2,
        DateTime data
    )
    {

        Placar_time_1 = placar_time_1;
        Placar_time_2 = placar_time_2;
        Id_edicao = id_edicao;
        Id_fase = id_fase;
        Id_local = id_local;
        Id_time_1 = id_time_1;
        Id_time_2 = id_time_2;
        Data = data;
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