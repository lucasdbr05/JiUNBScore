namespace Backend.ViewModels;

public class LoginViewModel
{
    public LoginViewModel(string nickname, string password)
    {
        Nickname = nickname;
        Password = password;
    }

    public string Nickname { get; set; }
    public string Password { get; set; }
}