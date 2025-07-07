namespace Backend.ViewModels;

public class CreateEditionViewModel
{
    public CreateEditionViewModel(
        DateTime dataFim,
        DateTime dataComeco,
        List<int> selectedSports
    )
    {
        DataComeco = dataComeco;
        DataFim = dataFim;
        SelectedSports = selectedSports;
    }

    public DateTime DataComeco { get; set; }
    public DateTime DataFim { get; set; }
    public List<int> SelectedSports { get; set; } = new List<int>();
}