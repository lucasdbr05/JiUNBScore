import React, { useState } from 'react';
import type { CreateStatisticData } from '../lib/types';

interface CreateStatisticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateStatisticData) => Promise<void>;
  matchId: number;
  competitors: { id: number; nome: string }[];
  actions: { id: number; nome: string }[];
}

export const CreateStatisticModal: React.FC<CreateStatisticModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  matchId,
  competitors,
  actions,
}) => {
  const [id_competidor, setCompetidor] = useState<number>(competitors[0]?.id || 0);
  const [id_acao, setAcao] = useState<number>(actions[0]?.id || 0);
  const [qtd_acoes, setQtdAcoes] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onCreate({
        qtdAcoes: qtd_acoes,
        idPartida: matchId,
        idAcao: id_acao,
        idCompetidor: id_competidor,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar estatística');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Criar Estatística</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-semibold">Competidor</label>
            <select value={id_competidor} onChange={e => setCompetidor(Number(e.target.value))} className="border rounded px-2 py-1 w-full">
              {competitors.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Ação</label>
            <select value={id_acao} onChange={e => setAcao(Number(e.target.value))} className="border rounded px-2 py-1 w-full">
              {actions.map(a => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-semibold">Quantidade</label>
            <input type="number" min={1} value={qtd_acoes} onChange={e => setQtdAcoes(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60" disabled={loading}>
            {loading ? 'Salvando...' : 'Criar Estatística'}
          </button>
        </form>
      </div>
    </div>
  );
};
