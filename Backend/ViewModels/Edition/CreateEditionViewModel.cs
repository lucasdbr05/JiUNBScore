namespace Backend.ViewModels;

public class CreateEditionViewModel
{

    public CreateEditionViewModel(
        DateTime dataFim,
        DateTime dataComeco
    )
    {
        DataComeco = dataComeco;
        DataFim = dataFim;
    }

    public DateTime DataComeco { get; set; }
    public DateTime DataFim { get; set; }
}