import React, { useEffect, useState } from 'react';
import { Api } from '../lib/apiClient';
import type { Match, Statistic, Action, Competitor, Athletic } from '../lib/types';

interface MatchDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: number;
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({ isOpen, onClose, matchId}) => {
  const [match, setMatch] = useState<Match | null>(null);
  const [actions, setActions] = useState<Action[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [athletics, setAthletics] = useState<Athletic[]>([]);

  const athletic1 = athletics.find(a => a.id === match?.id_time_1);
  const athletic2 = athletics.find(a => a.id === match?.id_time_2);
  
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    const api = new Api();
    Promise.all([
      api.getMatch(matchId),
      api.getStatistics(),
      api.getActions(),
      api.getCompetitors(),
      api.getAthletics()
    ]).then(([match, stats, actions, competitors, athletics]) => {
      setMatch(match);
      setActions(actions);
      setCompetitors(competitors);
      setStatistics(stats.filter((s: Statistic) => s.idPartida === matchId));
      setAthletics(athletics);
    }).finally(() => setLoading(false));
  }, [isOpen, matchId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Detalhes da Partida</h2>
        {loading || !match ? (
          <div>Carregando...</div>
        ) : (
          <>
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex gap-2 items-center justify-center text-lg font-semibold">
                <span>{athletic1?.nome}</span>
                <span className="mx-2">{match.placar_time_1} x {match.placar_time_2}</span>
                <span>{athletic2?.nome}</span>
              </div>
              <div className="text-center text-gray-600 text-sm">Data: {match.data ? new Date(match.data).toLocaleString() : ''}</div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ações da Partida</h3>
              {statistics.length === 0 ? (
                <div className="text-gray-500">Nenhuma ação registrada.</div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {statistics.map(stat => {
                    const action = actions.find(a => a.id === stat.idAcao);
                    const competitor = competitors.find(c => c.matricula === stat.idCompetidor);
                    return (
                      <li key={stat.id} className="py-2 flex flex-col md:flex-row md:items-center md:gap-2">
                        <span className="font-medium">{competitor?.nome || stat.idCompetidor}</span>
                        <span className="text-gray-600">- {action?.nome || stat.idAcao}</span>
                        <span className="ml-auto">Qtd: {stat.qtdAcoes}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
