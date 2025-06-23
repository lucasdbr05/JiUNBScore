import React from 'react';

const sports = [
  { name: 'Futebol', icon: '/file.svg' },
  { name: 'Vôlei', icon: '/globe.svg' },
  { name: 'Basquete', icon: '/window.svg' },
  { name: 'Handebol', icon: '/vercel.svg' },
];

interface HeaderProps {
  user: { nickname: string; email: string } | null;
  onAuthClick: () => void;
}

export function Header({ user, onAuthClick }: HeaderProps) {
  return (
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
        onClick={onAuthClick}
      >
        {user ? 'Perfil' : 'Login / Sign Up'}
      </button>
    </header>
  );
}
