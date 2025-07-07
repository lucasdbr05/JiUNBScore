import React from 'react';
import { useRouter } from 'next/router';
import { SportDropdown, SportDropdownItem } from './SportDropdown';

interface HeaderProps {
  user: { nickname: string; email: string } | null;
  onAuthClick: () => void;
  sports: SportDropdownItem[];
  onSportSelect?: (sport: SportDropdownItem) => void;
}

export function Header({ user, onAuthClick, sports, onSportSelect }: HeaderProps) {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between bg-neutral-900 text-white px-8 py-4">
      <div
        className="text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => router.push('/')}
      >
        JiUNBScore
      </div>
      <input
        className="flex-1 mx-8 px-4 py-2 rounded-lg border-none text-black text-base min-w-[200px] max-w-md bg-white"
        type="text"
        placeholder="Pesquisar times, atletas, competições..."
      />
      <SportDropdown sports={sports} onSelect={onSportSelect} />
      <button
        className="ml-4 px-4 py-2 bg-green-600 text-white rounded border hover:bg-green-700 transition-colors"
        onClick={() => router.push('/edition/create')}
      >
        Criar Edição
      </button>
      <button
        className="ml-4 px-4 py-2 bg-white text-black rounded border hover:bg-black hover:text-white transition-colors"
        onClick={onAuthClick}
      >
        {user ? 'Perfil' : 'Login / Sign Up'}
      </button>
    </header>
  );
}
