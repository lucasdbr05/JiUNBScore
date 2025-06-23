import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Api } from '../lib/apiClient';
import type { Match, Fase, Athletic } from '../lib/types';
import { AuthCard } from '../components/AuthCard';
import { login, signUp, logout, getUser } from '../lib/auth';

const sports = [
  { name: 'Futebol', icon: '/file.svg' },
  { name: 'Vôlei', icon: '/globe.svg' },
  { name: 'Basquete', icon: '/window.svg' },
  { name: 'Handebol', icon: '/vercel.svg' },
];


export default function Home() {
  const [nextMatches, setNextMatches] = useState<Match[]>([]);
  const [mainCompetitions, setMainCompetitions] = useState<Fase[]>([]);
  const [athletics, setAthletics] = useState<Athletic[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<{ nickname: string; email: string } | null>(getUser());

  useEffect(() => {
    const api = new Api();
    // Buscar próximas partidas
    api.getMatches().then(setNextMatches).catch(() => {
      // fallback mock se erro
      setNextMatches([
        { id: 1, placar_time_1: 0, placar_time_2: 0, id_edicao: 1, id_fase: 1, id_local: 1, id_time_1: 1, id_time_2: 2, date: '2025-06-18T19:00:00' },
        { id: 2, placar_time_1: 0, placar_time_2: 0, id_edicao: 1, id_fase: 1, id_local: 1, id_time_1: 3, id_time_2: 4, date: '2025-06-19T20:00:00' },
      ]);
    });
    // Buscar principais competições (fases)
    api.getFases().then(setMainCompetitions).catch(() => {
      setMainCompetitions([
        { id: 1, ordem: 1, nome_grupo: 'Grupo A', nome_etapa: 'InterAtléticas 2025' },
        { id: 2, ordem: 2, nome_grupo: 'Grupo B', nome_etapa: 'Copa UnB' },
      ]);
    });
    // Buscar atléticas
    api.getAthletics().then(setAthletics).catch(() => {
      setAthletics([
        { id: 1, nome: 'Atlética A', logo: null },
        { id: 2, nome: 'Atlética B', logo: null },
        { id: 3, nome: 'Atlética C', logo: null },
        { id: 4, nome: 'Atlética D', logo: null },
      ]);
    });

  }, []);

  const handleLogin = async (data: any) => {
    const u = await login(data);
    setShowAuth(false);
  };
  const handleSignUp = async (data: any) => {
    const u = await signUp(data);
    setShowAuth(false);
  };
  const handleLogout = () => {
    logout();
    setUser(null);
    setShowAuth(false);
  };

  return (
    <>
      <Head>
        <title>JiUNBScore - Home</title>
      </Head>
      <header className="flex items-center justify-between bg-neutral-900 text-white px-8 py-4">
        <div className="text-2xl font-bold tracking-wide">JiUNBScore</div>
        <input
          className="flex-1 mx-8 px-4 py-2 rounded-lg border-none text-black text-base min-w-[200px] max-w-md bg-white"
          type="text"
          placeholder="Pesquisar times, atletas, competições..."
        />
        <nav className="flex gap-8">
          {sports.map((sport) => (
            <div key={sport.name} className="flex flex-col items-center cursor-pointer text-white text-sm">
              <img src={sport.icon} alt={sport.name} width={24} height={24} className="mb-1" />
              <span>{sport.name}</span>
            </div>
          ))}
        </nav>
        <button
          className="ml-8 px-4 py-2 bg-white text-black rounded border hover:bg-black hover:text-white transition-colors"
          onClick={() => setShowAuth((v) => !v)}
        >
          {user ? 'Perfil' : 'Login / Sign Up'}
        </button>
      </header>
      {showAuth && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <AuthCard
            user={user}
            onLogin={handleLogin}
            onSignUp={handleSignUp}
            onLogout={handleLogout}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setShowAuth(false)}
          >
            ×
          </button>
        </div>
      )}
      <main className="p-8 bg-neutral-100 min-h-[80vh]">
        <section className="mb-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Próximas Partidas</h2>
          <ul>
            {nextMatches.map((match, idx) => {
              // Buscar nomes das atléticas
              const time1 = athletics.find(a => a.id === match.id_time_1)?.nome || `Time ${match.id_time_1}`;
              const time2 = athletics.find(a => a.id === match.id_time_2)?.nome || `Time ${match.id_time_2}`;
              return (
                <li key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0">
                  <span className="font-medium">{time1} vs {time2}</span>
                  <span className="text-gray-500 text-sm">{new Date(match.date).toLocaleString('pt-BR')}</span>
                  <span className="text-gray-500 text-sm">{mainCompetitions.find(f => f.id === match.id_fase)?.nome_etapa || 'Competição'}</span>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Principais Competições</h2>
          <ul>
            {mainCompetitions.map((comp, idx) => (
              <li key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <span className="font-medium">{comp.nome_etapa}</span>
                <span className="text-gray-500 text-sm">{comp.nome_grupo}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
