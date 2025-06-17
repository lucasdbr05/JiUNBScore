import Head from 'next/head';

const sports = [
  { name: 'Futebol', icon: '/file.svg' },
  { name: 'Vôlei', icon: '/globe.svg' },
  { name: 'Basquete', icon: '/window.svg' },
  { name: 'Handebol', icon: '/vercel.svg' },
];

const nextMatches = [
  { teams: 'Atlética A vs Atlética B', date: '18/06/2025 19:00', sport: 'Futebol' },
  { teams: 'Atlética C vs Atlética D', date: '19/06/2025 20:00', sport: 'Vôlei' },
];

const mainCompetitions = [
  { name: 'InterAtléticas 2025', sport: 'Futebol' },
  { name: 'Copa UnB', sport: 'Basquete' },
];

export default function Home() {
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
      </header>
      <main className="p-8 bg-neutral-100 min-h-[80vh]">
        <section className="mb-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Próximas Partidas</h2>
          <ul>
            {nextMatches.map((match, idx) => (
              <li key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <span className="font-medium">{match.teams}</span>
                <span className="text-gray-500 text-sm">{match.date}</span>
                <span className="text-gray-500 text-sm">{match.sport}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Principais Competições</h2>
          <ul>
            {mainCompetitions.map((comp, idx) => (
              <li key={idx} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <span className="font-medium">{comp.name}</span>
                <span className="text-gray-500 text-sm">{comp.sport}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
