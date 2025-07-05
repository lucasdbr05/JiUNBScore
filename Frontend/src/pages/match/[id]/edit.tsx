import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Api } from '../../../lib/apiClient';
import { CreateStatisticModal } from '../../../components/CreateStatisticModal';
  const [showStatModal, setShowStatModal] = useState(false);
  const [competitors, setCompetitors] = useState<{ id: number; nome: string }[]>([]);
  const [actions, setActions] = useState<{ id: number; nome: string }[]>([]);
  const openStatModal = async () => {
    if (!id) return;
    const api = new Api();
    const [comps, acts] = await Promise.all([
      api.getCompetitorsByMatch(Number(id)),
      api.getActions()
    ]);
    setCompetitors(comps);
    setActions(acts);
    setShowStatModal(true);
  };

  const handleCreateStatistic = async (data: any) => {
    const api = new Api();
    await api.createStatistic(data);
  };
import type { Match } from '../../../lib/types';

export default function EditMatchPage() {
  const router = useRouter();
  const { id } = router.query;
  const [match, setMatch] = useState<Match | null>(null);
  const [placarTime1, setPlacarTime1] = useState<number>(0);
  const [placarTime2, setPlacarTime2] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [team1Name, setTeam1Name] = useState<string>('');
  const [team2Name, setTeam2Name] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [faseLabel, setFaseLabel] = useState<string>('');
  const [editionDates, setEditionDates] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    const api = new Api();
    api.getMatch(Number(id)).then(async m => {
      setMatch(m);
      setPlacarTime1(m.placar_time_1 ?? 0);
      setPlacarTime2(m.placar_time_2 ?? 0);
      setDate(m.data ? m.data.slice(0, 16) : '');
      try {
        const [team1, team2, fase, edition] = await Promise.all([
          m.id_time_1 != null ? api.getAthletic(Number(m.id_time_1)) : Promise.resolve(null),
          m.id_time_2 != null ? api.getAthletic(Number(m.id_time_2)) : Promise.resolve(null),
          m.id_fase != null && api.getFase ? api.getFase(Number(m.id_fase)) : Promise.resolve(null),
          m.id_edicao != null && api.getEdition ? api.getEdition(Number(m.id_edicao)) : Promise.resolve(null)
        ]);
        setTeam1Name(team1?.nome ? String(team1.nome) : m.id_time_1 != null ? m.id_time_1.toString() : '');
        setTeam2Name(team2?.nome ? String(team2.nome) : m.id_time_2 != null ? m.id_time_2.toString() : '');
        // Fase: nomeGrupo ou nomeEtapa
        let faseNome = '';
        if (fase && typeof fase === 'object') {
          if ('nomeGrupo' in fase && fase.nomeGrupo) faseNome = String(fase.nomeGrupo);
          else if ('nomeEtapa' in fase && fase.nomeEtapa) faseNome = String(fase.nomeEtapa);
          else if ('nome' in fase && fase.nome) faseNome = String(fase.nome);
        }
        setFaseLabel(faseNome || (m.id_fase != null ? m.id_fase.toString() : ''));
        // Ano da edição
        let ano = '';
        if (edition && typeof edition === 'object' && 'data_inicio' in edition && typeof edition.data_inicio === 'string') {
          ano = new Date(edition.data_inicio).getFullYear().toString();
        }
        setEditionDates(ano);
      } catch {
        setTeam1Name(m.id_time_1 != null ? m.id_time_1.toString() : '');
        setTeam2Name(m.id_time_2 != null ? m.id_time_2.toString() : '');
        setFaseLabel(m.id_fase != null ? m.id_fase.toString() : '');
        setEditionDates('');
      }
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const api = new Api();
      await api.updateMatch(Number(id), {
        id: Number(id),
        placarTime1: placarTime1,
        placarTime2: placarTime2,
        idEdicao: match?.id_edicao ?? undefined,
        idFase: match?.id_fase ?? undefined,
        idLocal: match?.id_local ?? undefined,
        idTime1: match?.id_time_1 ?? undefined,
        idTime2: match?.id_time_2 ?? undefined,
        data: date ? new Date(date).toISOString() : undefined
      });
      router.push(`/edition/${match?.id_edicao}`);
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar placar');
    } finally {
      setLoading(false);
    }
  };

  if (!match) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Editar Placar</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <button
          type="button"
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={openStatModal}
        >
          Criar Estatística
        </button>
      <CreateStatisticModal
        isOpen={showStatModal}
        onClose={() => setShowStatModal(false)}
        onCreate={handleCreateStatistic}
        matchId={Number(id)}
        competitors={competitors}
        actions={actions}
      />
        <div className="flex flex-col gap-2 bg-gray-50 rounded p-4 border mb-2">
          <div className="flex gap-2">
            <span className="font-semibold">Fase:</span>
            <span>{faseLabel}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Edição:</span>
            <span>{editionDates}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Local:</span>
            <span>{match.id_local}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Time 1:</span>
            <span>{team1Name}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Time 2:</span>
            <span>{team2Name}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-semibold">Data:</span>
            <input
              type="datetime-local"
              className="border rounded px-2 py-1"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 mb-2 items-center">
          <span className="font-semibold text-right w-24">{team1Name}</span>
          <input
            type="number"
            name="placarTime1"
            value={placarTime1}
            onChange={e => setPlacarTime1(Number(e.target.value))}
            min={0}
            className="border rounded px-3 py-2 w-24 text-center"
            placeholder="Placar Time 1"
            required
          />
          <span className="font-bold text-lg">x</span>
          <input
            type="number"
            name="placarTime2"
            value={placarTime2}
            onChange={e => setPlacarTime2(Number(e.target.value))}
            min={0}
            className="border rounded px-3 py-2 w-24 text-center"
            placeholder="Placar Time 2"
            required
          />
          <span className="font-semibold text-left w-24">{team2Name}</span>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar Placar'}
        </button>
      </form>
    </div>
  );
}
