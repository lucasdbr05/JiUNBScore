namespace Backend.ViewModels;

public class CreateEditionViewModel
{

    public CreateEditionViewModel(
        DateTime dataFim,
        DateTime dataComeco
    )
    {
        DataComeco = dateComeco;
        DataFim = dataFim;
    }

    public DateTime DataComeco { get; set; }
    public DateTime DataFim { get; set; }
}