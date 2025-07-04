import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Athletic, Edition, RegisterMatchData, Fase } from '../../lib/types';
import { useRouter } from 'next/router';

export default function CreateMatchPage() {
  const [athletics, setAthletics] = useState<Athletic[]>([]);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [phases, setPhases] = useState<Fase[]>([]);
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
  const [encerrada, setEncerrada] = useState(true);
  const [confrontoDefinido, setConfrontoDefinido] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const api = new Api();
    api.getAthletics().then(setAthletics);
    api.getEditions().then(setEditions);
    api.getFases().then(setPhases);
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
      await api.registerMatch({
        ...form,
        idEdicao: Number(form.idEdicao),
        idFase: Number(form.idFase),
        idLocal: Number(form.idLocal),
        idTime1: Number(form.idTime1),
        idTime2: Number(form.idTime2),
        placarTime1: encerrada ? Number(form.placarTime1) : 0,
        placarTime2: encerrada ? Number(form.placarTime2) : 0,
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
        <select name="idFase" value={form.idFase} onChange={handleChange} required className="border rounded px-3 py-2">
          <option value="">Selecione a fase</option>
          {phases.map(f => (
            <option key={f.id} value={f.id}>{f.nomeGrupo ? `${f.nomeGrupo} - ` : ''}{f.nomeEtapa}</option>
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
        <div className="flex items-center gap-4 mb-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-sm">Confronto definido</span>
            <span className="relative inline-block w-12 h-7 align-middle select-none">
              <input
                type="checkbox"
                checked={confrontoDefinido}
                onChange={() => setConfrontoDefinido(!confrontoDefinido)}
                className="absolute w-7 h-7 opacity-0 cursor-pointer z-10"
                style={{ left: 0, top: 0 }}
              />
              <span
                className={`block w-12 h-7 rounded-full transition-colors duration-200 ${confrontoDefinido ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></span>
              <span
                className={`absolute left-0 top-0 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-200 ${confrontoDefinido ? 'translate-x-5' : 'translate-x-0'}`}
              ></span>
            </span>
          </label>
        </div>
        {confrontoDefinido && (
          <>
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
          </>
        )}
        <div className="flex items-center gap-4 mb-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <span className="text-sm">Partida encerrada</span>
            <span className="relative inline-block w-12 h-7 align-middle select-none">
              <input
                type="checkbox"
                checked={encerrada}
                onChange={() => setEncerrada(!encerrada)}
                className="absolute w-7 h-7 opacity-0 cursor-pointer z-10"
                style={{ left: 0, top: 0 }}
              />
              <span
                className={`block w-12 h-7 rounded-full transition-colors duration-200 ${encerrada ? 'bg-green-500' : 'bg-gray-300'}`}
              ></span>
              <span
                className={`absolute left-0 top-0 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-200 ${encerrada ? 'translate-x-5' : 'translate-x-0'}`}
              ></span>
            </span>
          </label>
        </div>
        {encerrada && (
          <div className="flex gap-4 mb-2">
            <input
              type="number"
              name="placarTime1"
              value={form.placarTime1}
              onChange={handleChange}
              min={0}
              className="border rounded px-3 py-2 w-24"
              placeholder="Placar Time 1"
            />
            <input
              type="number"
              name="placarTime2"
              value={form.placarTime2}
              onChange={handleChange}
              min={0}
              className="border rounded px-3 py-2 w-24"
              placeholder="Placar Time 2"
            />
          </div>
        )}
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
