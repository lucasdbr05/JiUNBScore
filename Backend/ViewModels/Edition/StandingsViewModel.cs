using System.Collections.Generic;

namespace Backend.ViewModels;


public class StandingsViewModel
{
    public StandingsViewModel(
        int teamId,
        string teamName,
        string teamLogo,
        int gamesPlayed,
        int wins,
        int draws,
        int looses,
        int scoresDifference,
        int scored,
        int concened,
        List<string> last5,
        int points)
    {
        TeamId = teamId;
        TeamName = teamName;
        TeamLogo = teamLogo;
        GamesPlayed = gamesPlayed;
        Wins = wins;
        Draws = draws;
        Looses = looses;
        ScoresDifference = scoresDifference;
        Scored = scored;
        Concened = concened;
        Last5 = last5;
        Points = points;
    }

    public int Rank { get; set; }
    public int TeamId { get; set; }
    public string TeamName { get; set; }
    public byte[] TeamLogo { get; set; }
    public int GamesPlayed { get; set; }
    public int Wins { get; set; }
    public int Draws { get; set; }
    public int Looses { get; set; }
    public int ScoresDifference { get; set; }
    public int Scored { get; set; }
    public int Conceded { get; set; }
    public List<string> Last5 { get; set; }
    public int Points { get; set; }
}