import React, { useState } from 'react';

export interface SportDropdownItem {
  id: number;
  nome: string;
}

interface SportDropdownProps {
  sports: SportDropdownItem[];
  onSelect?: (sport: SportDropdownItem) => void;
}

export const SportDropdown: React.FC<SportDropdownProps> = ({ sports, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SportDropdownItem | null>(null);

  const handleSelect = (sport: SportDropdownItem) => {
    setSelected(sport);
    setOpen(false);
    onSelect?.(sport);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded border hover:bg-gray-100 min-w-[120px]"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {selected ? selected.nome : 'Esportes'}
        <span className="ml-2">▼</span>
      </button>
      {open && (
        <ul className="absolute left-0 mt-2 w-full  bg-white border rounded shadow z-10">
          {sports.map((sport) => (
            <li
              key={sport.id}
              className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(sport)}
            >
              {sport.nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
