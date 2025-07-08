import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Match, Edition, Athletic, RankingAtleta } from '../../lib/types';
import { getUser } from '../../lib/auth';
import { StandingsTable } from '../../components/StandingsTable';
import { MatchDetailsModal } from '../../components/MatchDetailsModal';
import type { TeamStats } from '../../components/StandingsTable';

export default function EditionPage({ selectedSport }: { selectedSport: number }) {
  const router = useRouter();
  const { id } = router.query;
  const [edition, setEdition] = useState<Edition | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [athletics, setAthletics] = useState<Athletic[]>([]);
  const [user, setUser] = useState<{ nickname: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'jogos' | 'classificacao'>('jogos');
  const [standings, setStandings] = useState<TeamStats[] | Record<string, TeamStats[]>>([]);
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState<number | null>(null);
  const [ranking, setRanking] = useState<RankingAtleta[]>([]);

  useEffect(() => {
    setUser(getUser() as { nickname: string; email: string } | null);
  }, []);

  useEffect(() => {
    if (!id) return;
    const api = new Api();
    api.getEdition(Number(id)).then(setEdition);
    api.getMatches(selectedSport).then(ms => setMatches(ms.filter(m => m.id_edicao === Number(id))));
    api.getAthletics().then(setAthletics);
    api.getStandings(Number(id), selectedSport).then(data => {
      if (Array.isArray(data)) {
        setStandings(data);
      } else if (typeof data === 'object' && data !== null) {
        setStandings(data);
      } else {
        setStandings([]);
      }
    });
    api.getRankingByEdition(Number(id)).then(setRanking);
  }, [id, selectedSport]);

  if (!edition) return <div className="p-8">Carregando...</div>;

  return (
    <>
      <div className="p-8 max-w-6xl mx-auto flex gap-8">
        <section className="w-2/3">
          <h1 className="text-2xl font-bold mb-4">
            Competição: {new Date(edition.data_comeco).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
            {' '} - {' '}
            {new Date(edition.data_fim).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
          </h1>
          {user && (
            <button
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => router.push(`/edition/${id}/phases`)}
            >
              Editar Competição
            </button>
          )}
          {user && (
            <button
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded border hover:bg-green-700 transition-colors"
              onClick={() => router.push('/match/create')}
            >
              Criar Partida
            </button>
          )}
          <div className="flex gap-2 mt-6 mb-4">
            <button
              className={`px-4 py-2 rounded-t ${activeTab === 'jogos' ? 'bg-white border-x border-t border-b-0 font-bold' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setActiveTab('jogos')}
            >
              Jogos
            </button>
            <button
              className={`px-4 py-2 rounded-t ${activeTab === 'classificacao' ? 'bg-white border-x border-t border-b-0 font-bold' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setActiveTab('classificacao')}
            >
              Classificação
            </button>
          </div>
          <div className="bg-white rounded-b-xl shadow p-6 mb-8 border-t-0 border border-gray-200">
            {activeTab === 'jogos' && (
              <>
                <h2 className="text-xl font-semibold mb-2">Jogos</h2>
                <ul>
                  {matches.map((match, idx) => {
                    const athletic1 = athletics.find(a => a.id === match.id_time_1);
                    const athletic2 = athletics.find(a => a.id === match.id_time_2);
                    const time1 = athletic1?.nome || `Time ${match.id_time_1}`;
                    const time2 = athletic2?.nome || `Time ${match.id_time_2}`;
                    return (
                      <li key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span className="flex items-center gap-2">
                          {athletic1?.logo && (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={athletic1.logo} alt={time1} className="h-6 w-6 object-cover border" />
                            </>
                          )}
                          {time1}
                        </span>
                        <span>{typeof match.placar_time_1 === 'number' ? match.placar_time_1 : '-'} x {typeof match.placar_time_2 === 'number' ? match.placar_time_2 : '-'} </span>
                        <span className="flex items-center gap-2">
                          {athletic2?.logo && (
                            <>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={athletic2.logo} alt={time2} className="h-6 w-6 object-cover border" />
                            </>
                          )}
                          {time2}
                        </span>
                        <span>{new Date(match.data).toLocaleString('pt-BR')}</span>
                        <button
                          className="mr-2 px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs"
                          onClick={() => { setSelectedMatchId(match.id); setShowMatchDetails(true); }}
                        >
                          Ver detalhes
                        </button>
                        <button
                          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 text-xs"
                          onClick={() => router.push(`/match/${match.id}/edit`)}
                        >
                          Editar
                        </button>
                {showMatchDetails && selectedMatchId !== null && (
                  <MatchDetailsModal
                    isOpen={showMatchDetails}
                    onClose={() => setShowMatchDetails(false)}
                    matchId={selectedMatchId}
                    athletic1={athletic1}
                    athletic2={athletic2}
                  />
                )}
                        {user && (
                          <button
                            className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-xs"
                            onClick={async () => {
                              if (confirm('Tem certeza que deseja deletar esta partida?')) {
                                const api = new Api();
                                await api.deleteMatch(match.id);
                                setMatches(matches.filter(m => m.id !== match.id));
                              }
                            }}
                          >
                            Deletar
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {activeTab === 'classificacao' && (
              <>
                <h2 className="text-xl font-semibold mb-2">Classificação</h2>
                {Array.isArray(standings) ? (
                  <StandingsTable stats={standings} athletics={athletics} />
                ) : (
                  Object.entries(standings).map(([groupName, stats]) => (
                    <div key={groupName} className="mb-8">
                      <h3 className="text-lg font-bold mb-2">{groupName}</h3>
                      <StandingsTable stats={stats as TeamStats[]} athletics={athletics} />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </section>
        <aside className="w-1/3 bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Ranking da Competição</h2>
          {ranking.length === 0 ? (
            <div className="text-gray-500">Nenhum atleta ranqueado.</div>
          ) : (
            <ol className="space-y-2">
              {ranking.map((r, idx) => (
                <li key={r.atletaId} className="flex items-center gap-2">
                  <span className="font-bold w-6 text-right">{idx + 1}.</span>
                  <span className="flex-1">{r.atletaNome}</span>
                  <span className="text-xs text-gray-500">({r.atleticaNome})</span>
                  <span className="ml-auto font-mono bg-gray-100 rounded px-2 py-0.5">{r.ranking.toFixed(2)}</span>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
    </>
  );
}
