
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Api } from '../lib/apiClient';
import type { Match, Athletic, Edition } from '../lib/types';
import { AuthCard } from '../components/AuthCard';
// import { getUser } from '../lib/auth';
import { SportDropdownItem } from '../components/SportDropdown';


interface HomeProps {
  selectedSport: number | undefined;
  setSelectedSport: (id: number | undefined) => void;
  sports: SportDropdownItem[];
}

export default function Home({ selectedSport }: HomeProps) {
  const [nextMatches, setNextMatches] = useState<Match[]>([]);
  const [mainEdition, setMainEdition] = useState<Edition[]>([]);
  const [athletics, setAthletics] = useState<Athletic[]>([]);


  useEffect(() => {
    const api = new Api();
    api.getMatches(selectedSport).then(setNextMatches).catch(() => {
      setNextMatches([
        { id: 1, placar_time_1: 0, placar_time_2: 0, id_edicao: 1, id_fase: 1, id_local: 1, id_time_1: 1, id_time_2: 2, data: '2025-06-18T19:00:00' },
        { id: 2, placar_time_1: 0, placar_time_2: 0, id_edicao: 1, id_fase: 1, id_local: 1, id_time_1: 3, id_time_2: 4, data: '2025-06-19T20:00:00' },
      ]);
    });
    api.getEditions(selectedSport).then(setMainEdition).catch(() => {
      setMainEdition([
        { id: 1, data_fim: '2025-07-01', data_comeco: '2025-10-30' },
        { id: 2, data_fim: '2025-08-01', data_comeco: '2025-11-30' },
      ]);
    });
    api.getAthletics().then(setAthletics).catch(() => {
      setAthletics([
        { id: 1, nome: 'Atlética A', logo: null },
        { id: 2, nome: 'Atlética B', logo: null },
        { id: 3, nome: 'Atlética C', logo: null },
        { id: 4, nome: 'Atlética D', logo: null },
      ]);
    });
  }, [selectedSport]);


  return (
    <>
      <Head>
        <title>JiUNBScore - Home</title>
      </Head>
      
      <main className="p-8 bg-neutral-100 min-h-[80vh] flex gap-8">
        <aside className="w-80 flex-shrink-0">
          <button
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
            onClick={() => window.location.href = '/athletics/create'}
          >
            Registrar nova Atlética
          </button>
          <section className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Principais Competições</h2>
            <ul>
              {mainEdition.map((comp, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                  onClick={() => window.location.href = `/edition/${comp.id}`}
                >
                  <span className="font-medium">{new Date(comp.data_comeco).getFullYear()}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
        <section className="flex-1 mb-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Próximas Partidas</h2>
          <ul>
            {nextMatches.map((match, idx) => {
              const time1 = athletics.find(a => a.id === match.id_time_1)?.nome || `Time ${match.id_time_1}`;
              const time2 = athletics.find(a => a.id === match.id_time_2)?.nome || `Time ${match.id_time_2}`;
              return (
                <li key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0">
                  <span className="font-medium">{time1} vs {time2}</span>
                  <span className="text-gray-500 text-sm">{new Date(match.data).toLocaleString('pt-BR')}</span>
                  <span className="text-gray-500 text-sm">{'Ano'}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
