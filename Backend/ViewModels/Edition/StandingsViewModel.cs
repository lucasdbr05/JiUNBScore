using System.Collections.Generic;

namespace Backend.ViewModels;


class StandingsViewModel
{
    public StandingsViewModel(
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

    public string TeamName { get; set; }
    public string TeamLogo { get; set; }
    public int GamesPlayed { get; set; }
    public int Wins { get; set; }
    public int Draws { get; set; }
    public int Looses { get; set; }
    public int ScoresDifference { get; set; }
    public int Scored { get; set; }
    public int Concened { get; set; }
    public List<string> Last5 { get; set; }
    public int Points { get; set; }
}