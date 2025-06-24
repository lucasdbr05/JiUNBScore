namespace Backend.ViewModels;

public class UpdateEditionViewModel
{

    public UpdateEditionViewModel(
        DateTime? data_fim,
        DateTime? date_comeco
    )
    {
        DataComeco = date_comeco;
        DataFim = data_fim;
    }

    public DateTime? DataComeco { get; set; }
    public DateTime? DataFim { get; set; }
}