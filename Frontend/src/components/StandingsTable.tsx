import React from 'react';

interface TeamStats {
  rank: number;
  teamName: string;
  teamLogo?: string;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalDifference: number;
  goalsScored: number;
  goalsConceded: number;
  last5: ('V' | 'E' | 'D')[];
  points: number;
}

interface StandingsTableProps {
  stats: TeamStats[];
}

const getResultColor = (result: 'V' | 'E' | 'D') => {
  switch (result) {
    case 'V':
      return 'bg-green-500';
    case 'E':
      return 'bg-gray-400';
    case 'D':
      return 'bg-red-500';
    default:
      return '';
  }
};

export const StandingsTable: React.FC<StandingsTableProps> = ({ stats }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">#</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Time</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">J</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">V</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">E</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">D</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">SALDO</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Gols</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">Últimos 5</th>
            <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600">PTS</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((team, index) => (
            <tr key={team.rank} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${team.rank <= 3 ? 'bg-green-500' : team.rank <= 6 ? 'bg-blue-500' : team.rank >= 17 ? 'bg-red-500' : 'bg-gray-500'}`}>
                  {team.rank}
                </span>
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800 flex items-center gap-2">
                {team.teamLogo && <img src={team.teamLogo} alt={team.teamName} className="w-5 h-5" />}
                {team.teamName}
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.gamesPlayed}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.wins}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.draws}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.losses}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.goalDifference >= 0 ? '+' : ''}{team.goalDifference}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.goalsScored}:{team.goalsConceded}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <div className="flex gap-1">
                  {team.last5.map((result, i) => (
                    <span key={i} className={`w-5 h-5 flex items-center justify-center text-xs text-white rounded ${getResultColor(result)}`}>
                      {result}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-2 border-b text-sm font-bold text-gray-800">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Mock data for demonstration
const mockStats: TeamStats[] = [
  { rank: 1, teamName: 'Flamengo', teamLogo: '/path/to/flamengo.png', gamesPlayed: 11, wins: 7, draws: 3, losses: 1, goalDifference: 20, goalsScored: 24, goalsConceded: 4, last5: ['D', 'V', 'E', 'V', 'V'], points: 24 },
  { rank: 2, teamName: 'Cruzeiro', teamLogo: '/path/to/cruzeiro.png', gamesPlayed: 12, wins: 7, draws: 3, losses: 2, goalDifference: 9, goalsScored: 17, goalsConceded: 8, last5: ['V', 'E', 'V', 'V', 'E'], points: 24 },
  { rank: 3, teamName: 'RB Bragantino', teamLogo: '/path/to/bragantino.png', gamesPlayed: 12, wins: 7, draws: 2, losses: 3, goalDifference: 3, goalsScored: 14, goalsConceded: 11, last5: ['E', 'D', 'V', 'V', 'D'], points: 23 },
  { rank: 4, teamName: 'Palmeiras', teamLogo: '/path/to/palmeiras.png', gamesPlayed: 11, wins: 7, draws: 1, losses: 3, goalDifference: 4, goalsScored: 12, goalsConceded: 8, last5: ['V', 'V', 'V', 'D', 'D'], points: 22 },
  { rank: 5, teamName: 'Bahia', teamLogo: '/path/to/bahia.png', gamesPlayed: 12, wins: 6, draws: 3, losses: 3, goalDifference: 3, goalsScored: 14, goalsConceded: 11, last5: ['D', 'V', 'D', 'V', 'V'], points: 21 },
  { rank: 6, teamName: 'Fluminense', teamLogo: '/path/to/fluminense.png', gamesPlayed: 11, wins: 6, draws: 2, losses: 3, goalDifference: 3, goalsScored: 15, goalsConceded: 12, last5: ['V', 'D', 'E', 'V', 'V'], points: 20 },
  { rank: 7, teamName: 'Atlético-MG', teamLogo: '/path/to/atleticomg.png', gamesPlayed: 12, wins: 5, draws: 5, losses: 2, goalDifference: 3, goalsScored: 13, goalsConceded: 10, last5: ['V', 'E', 'E', 'V', 'V'], points: 20 },
  { rank: 8, teamName: 'Botafogo', teamLogo: '/path/to/botafogo.png', gamesPlayed: 11, wins: 5, draws: 3, losses: 3, goalDifference: 7, goalsScored: 14, goalsConceded: 7, last5: ['D', 'V', 'E', 'V', 'V'], points: 18 },
  { rank: 9, teamName: 'Mirassol', teamLogo: '/path/to/mirassol.png', gamesPlayed: 11, wins: 4, draws: 5, losses: 2, goalDifference: 5, goalsScored: 17, goalsConceded: 12, last5: ['D', 'V', 'E', 'V', 'V'], points: 17 },
];
