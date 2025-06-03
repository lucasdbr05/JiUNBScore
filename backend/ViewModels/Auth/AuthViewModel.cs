namespace Backend.ViewModels;

public class LoginViewModel
{
    public LoginViewModel(string name, string password)
    {
        Name = name;
        Password = password;
    }

    public string Name { get; set; }
    public string Password { get; set; }
}