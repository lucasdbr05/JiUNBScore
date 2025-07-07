import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Athletic } from '../../lib/types';
import { useRouter } from 'next/router';

export default function AthleticsListPage() {
  const [athletics, setAthletics] = useState<Athletic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const api = new Api();
    api.getAthletics()
      .then(setAthletics)
      .catch(() => setError('Erro ao carregar atléticas.'))
      .finally(() => setLoading(false));
  }, []);

  console.log('athletics:', athletics);

  if (loading) return <div className="p-8">Carregando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Atléticas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {athletics
          .filter(atl => typeof atl.id === 'number' && !isNaN(atl.id))
          .map(atl => (
            <div key={atl.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              {atl.logo && (
                <img src={atl.logo} alt={atl.nome} className="h-20 mb-4 rounded" />
              )}
              <div className="font-semibold text-lg mb-2">{atl.nome}</div>
              <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => router.push(`/athletics/${atl.id}`)}
              >
                Ver detalhes
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}