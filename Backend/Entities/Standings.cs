using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Entities
{
    [Table("temp_standings")]
    public class Standings
    {
        [Column("team_id")]
        public int TeamId { get; set; }

        [Column("team_name")]
        public string TeamName { get; set; }

        [Column("team_logo")]
        public Byte[]? TeamLogo { get; set; }

        [Column("games_played")]
        public int GamesPlayed { get; set; }

        [Column("wins")]
        public int Wins { get; set; }

        [Column("draws")]
        public int Draws { get; set; }

        [Column("losses")]
        public int Losses { get; set; }

        [Column("saldo")]
        public int Saldo { get; set; }

        [Column("scored")]
        public int Scored { get; set; }

        [Column("conceded")]
        public int Conceded { get; set; }

        [Column("points")]
        public int Points { get; set; }

        [Column("rank")]
        public int Rank { get; set; }
    }
}
