namespace Backend.ViewModels;

public class RegisterLocalViewModel
{

    public string Ra { get; set; }
    public string Cep { get; set; }
    public string Quadra { get; set; }
    public string Rua { get; set; }
    public string Lote { get; set; }

    public RegisterLocalViewModel(
        string ra,
        string cep,
        string quadra,
        string rua,
        string lote
    )
    {
        Ra = ra;
        Cep = cep;
        Quadra = quadra;
        Rua = rua;
        Lote = lote;
    }
}