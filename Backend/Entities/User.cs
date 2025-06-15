using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities;

[Table("usuario")]
public class User
{
    public User(string nickname, string password, string email)
    {
        Nickname = nickname;
        Email = email;
        Password = password;
    }

    [Key]
    [Column("nickname")]
    public string Nickname { get; set; }

    [Column("email")]
    public string Email { get; set; }

    [Column("senha")]
    public string Password { get; set; }
}