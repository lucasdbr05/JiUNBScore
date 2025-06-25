import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Match, Edition, Athletic } from '../../lib/types';
import { getUser } from '../../lib/auth';
import { StandingsTable, mockStats } from '../../components/StandingsTable';

export default function EditionPage() {
  const router = useRouter();
  const { id } = router.query;
  const [edition, setEdition] = useState<Edition | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [athletics, setAthletics] = useState<Athletic[]>([]);
  const [user, setUser] = useState<{ nickname: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'jogos' | 'classificacao'>('jogos');

  useEffect(() => {
    setUser(getUser() as any);
  }, []);

  useEffect(() => {
    if (!id) return;
    const api = new Api();
    api.getEdition(Number(id)).then(setEdition);
    api.getMatches().then(ms => setMatches(ms.filter(m => m.id_edicao === Number(id))));
    api.getAthletics().then(setAthletics);
  }, [id]);

  if (!edition) return <div className="p-8">Carregando...</div>;

  return (
    <>
      <div className="p-8 max-w-6xl mx-auto flex gap-8">
        <section className="w-2/3">
          <h1 className="text-2xl font-bold mb-4">Competição: {edition.data_comeco} - {edition.data_fim}</h1>
          {user && (
            <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Editar Competição</button>
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
                    const time1 = athletics.find(a => a.id === match.id_time_1)?.nome || `Time ${match.id_time_1}`;
                    const time2 = athletics.find(a => a.id === match.id_time_2)?.nome || `Time ${match.id_time_2}`;
                    return (
                      <li key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <span>{time1} {typeof match.placar_time_1 === 'number' ? match.placar_time_1 : '-'} x {typeof match.placar_time_2 === 'number' ? match.placar_time_2 : '-'} {time2}</span>
                        <span>{new Date(match.date).toLocaleString('pt-BR')}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {activeTab === 'classificacao' && (
              <>
                <h2 className="text-xl font-semibold mb-2">Classificação</h2>
                <StandingsTable stats={mockStats} />
              </>
            )}
          </div>
        </section>
        <aside className="w-1/3 bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Estatísticas da Competição</h2>
          <div className="text-gray-500">(Em breve: ranking, artilharia, etc.)</div>
        </aside>
      </div>
    </>
  );
}
