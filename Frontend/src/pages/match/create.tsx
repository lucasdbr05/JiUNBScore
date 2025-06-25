import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Athletic, Edition, RegisterMatchData } from '../../lib/types';
import { useRouter } from 'next/router';

export default function CreateMatchPage() {
  const [athletics, setAthletics] = useState<Athletic[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [form, setForm] = useState<RegisterMatchData>({
    idEdicao: 0,
    idFase: 1,
    idLocal: 1,
    idTime1: 0,
    idTime2: 0,
    placarTime1: 0,
    placarTime2: 0,
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const api = new Api();
    api.getAthletics().then(setAthletics);
    api.getEditions().then(setEditions);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const api = new Api();
      await api.createMatch({
        ...form,
        idEdicao: Number(form.idEdicao),
        idFase: Number(form.idFase),
        idLocal: Number(form.idLocal),
        idTime1: Number(form.idTime1),
        idTime2: Number(form.idTime2),
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar partida');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Criar Partida</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <select name="idEdicao" value={form.idEdicao} onChange={handleChange} required className="border rounded px-3 py-2">
          <option value="">Selecione a competição</option>
          {editions.map(e => (
            <option key={e.id} value={e.id}>{e.data_comeco} - {e.data_fim}</option>
          ))}
        </select>
        <select name="idTime1" value={form.idTime1} onChange={handleChange} required className="border rounded px-3 py-2">
          <option value="">Selecione o Time 1</option>
          {athletics.map(a => (
            <option key={a.id} value={a.id}>{a.nome}</option>
          ))}
        </select>
        <select name="idTime2" value={form.idTime2} onChange={handleChange} required className="border rounded px-3 py-2">
          <option value="">Selecione o Time 2</option>
          {athletics.map(a => (
            <option key={a.id} value={a.id}>{a.nome}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        />
        {/* Campos para fase e local podem ser adicionados aqui */}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Partida'}
        </button>
      </form>
    </div>
  );
}
