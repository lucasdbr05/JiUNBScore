namespace Backend.ViewModels;

public class UpdateLocalViewModel
{

    public string Cep { get; set; }
    public string Ra { get; set; }
    public string Quadra { get; set; }
    public string Rua { get; set; }
    public string Lote { get; set; }

    public UpdateLocalViewModel(
        string cep,
        string ra,
        string quadra,
        string rua,
        string lote
    )
    {

        Cep = cep;
        Ra = ra;
        Quadra = quadra;
        Rua = rua;
        Lote = lote;
    }
}