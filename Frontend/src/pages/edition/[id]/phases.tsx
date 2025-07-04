import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Api } from '../../../lib/apiClient';
import type { Fase, CreateFaseData, Edition } from '../../../lib/types';

export default function PhasesPage() {
  const router = useRouter();
  const { id } = router.query;
  const [edition, setEdition] = useState<Edition | null>(null);
  const [phases, setPhases] = useState<Fase[]>([]);
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [nomeEtapa, setNomeEtapa] = useState('');
  const [ordem, setOrdem] = useState<number>(phases.length + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipo, setTipo] = useState<'grupo' | 'mata-mata'>('grupo');

  useEffect(() => {
    if (!id) return;
    const api = new Api();
    api.getEdition(Number(id)).then(setEdition);
    api.getFases().then(fases => setPhases(fases));
  }, [id]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const api = new Api();
      const data: CreateFaseData = {
        ordem,
        nomeGrupo: tipo === 'grupo' ? nomeGrupo : '',
        nomeEtapa: tipo === 'grupo' ? 'Grupo' : nomeEtapa
      };
      await api.createFase(data);
      const fases = await api.getFases();
      setPhases(fases);
      setNomeGrupo('');
      setNomeEtapa('');
      setOrdem(phases.length + 2);
    } catch {
      setError('Erro ao criar fase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Fases da Competição</h1>
      {edition && (
        <div className="mb-6 text-gray-700">Competição: {edition.data_comeco} - {edition.data_fim}</div>
      )}
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          className={`px-4 py-2 rounded ${tipo === 'grupo' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTipo('grupo')}
        >
          Grupo
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded ${tipo === 'mata-mata' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setTipo('mata-mata')}
        >
          Mata-mata
        </button>
      </div>
      <form onSubmit={handleCreate} className="mb-8 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        {tipo === 'grupo' && (
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Grupo <span className="text-gray-400 text-xs">(obrigatório)</span></label>
            <input value={nomeGrupo} onChange={e => setNomeGrupo(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="Ex: Grupo A" required={tipo === 'grupo'} />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Etapa</label>
          <input
            value={tipo === 'grupo' ? 'Grupo' : nomeEtapa}
            onChange={e => setNomeEtapa(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            required
            disabled={tipo === 'grupo'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ordem</label>
          <input type="number" value={ordem} onChange={e => setOrdem(Number(e.target.value))} className="border rounded px-3 py-2 w-24" min={1} required />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={loading}>
          {loading ? 'Salvando...' : 'Criar Fase'}
        </button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
      <h2 className="text-xl font-semibold mb-2">Fases da Competição</h2>
      <ul className="bg-white rounded-xl shadow p-4 divide-y">
        {phases.sort((a, b) => a.ordem - b.ordem).map(fase => (
          <li key={fase.id} className="py-2 flex items-center justify-between">
            <span>
              <span className="font-bold">{fase.ordem}.</span> {fase.nomeGrupo} - {fase.nomeEtapa}
            </span>
            <button
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 text-xs"
              onClick={async () => {
                if (window.confirm('Tem certeza que deseja deletar esta fase?')) {
                  setLoading(true);
                  setError(null);
                  try {
                    const api = new Api();
                    await api.deleteFase(fase.id);
                    const fases = await api.getFases();
                    setPhases(fases);
                  } catch {
                    setError('Erro ao deletar fase.');
                  } finally {
                    setLoading(false);
                  }
                }
              }}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
      <button className="mt-8 px-4 py-2 bg-gray-200 rounded" onClick={() => router.push(`/edition/${id}`)}>Voltar</button>
    </div>
  );
}
