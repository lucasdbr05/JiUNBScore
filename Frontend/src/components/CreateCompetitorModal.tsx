import { useState } from 'react';
import { Api } from '../lib/apiClient';

interface CreateCompetitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  athleticId: number;
}

export default function CreateCompetitorModal({ isOpen, onClose, onCreated, athleticId }: CreateCompetitorModalProps) {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const api = new Api();
      await api.createCompetitor({ 
        nome: nome, 
        matricula: matricula ,  
        idAtletica: athleticId }
      );
      setNome('');
      setMatricula('');
      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-4">Novo Competidor</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Matrícula</label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={matricula}
              onChange={e => setMatricula(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Criar Competidor'}
          </button>
        </form>
      </div>
    </div>
  );
}
