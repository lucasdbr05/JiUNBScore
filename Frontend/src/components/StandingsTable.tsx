import React from 'react';

interface TeamStats {
  rank: number;
  teamName: string;
  teamLogo?: string | null;
  gamesPlayed: number;
  wins: number;
  draws: number;
  looses: number;
  scoresDifference: number;
  scored: number;
  conceded: number;
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
              <td className="px-4 py-2 border-b text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  {team.teamLogo && <img src={team.teamLogo} alt={team.teamName} className="w-5 h-5" />}
                  <span>{team.teamName}</span>
                </div>
              </td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.gamesPlayed}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.wins}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.draws}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.looses}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.scoresDifference >= 0 ? '+' : ''}{team.scoresDifference}</td>
              <td className="px-4 py-2 border-b text-sm text-gray-800">{team.scored}:{team.conceded}</td>
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
