import { useState, useEffect } from 'react';
import { Api } from '../../lib/apiClient';
import { useRouter } from 'next/router';
import type { SportDropdownItem } from '../../components/SportDropdown';

export default function CreateEditionPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sports, setSports] = useState<SportDropdownItem[]>([]);
  const [selectedSports, setSelectedSports] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const api = new Api();
    api.getSports().then(setSports).catch(() => setSports([]));
  }, []);

  const handleSportToggle = (id: number) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const api = new Api();
      // Cria a edição
      const edition = await api.createEdition({
        dataComeco: startDate,
        dataFim: endDate,
        selectedSports: selectedSports,
      });
      router.push(`/edition/${edition.id}`);
    } catch (err: any) {
      setError('Erro ao criar edição.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-6">Criar Nova Edição</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Data de Início</label>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Data de Fim</label>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Esportes da Edição</label>
          <div className="flex flex-wrap gap-2">
            {sports.map(sport => (
              <button
                type="button"
                key={sport.id}
                className={`px-4 py-2 rounded border transition-colors
                  ${selectedSports.includes(sport.id)
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'}
                `}
                onClick={() => handleSportToggle(sport.id)}
              >
                {sport.nome}
              </button>
            ))}
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Edição'}
        </button>
      </form>
    </main>
  );
}
