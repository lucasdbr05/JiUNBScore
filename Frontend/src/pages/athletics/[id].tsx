import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Athletic } from '../../lib/types';
import { getUser } from '@/lib/auth';

export default function AthleticPage() {
    const router = useRouter();
    const [athletic, setAthletic] = useState<Athletic | null>(null);
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const { id }  = router.query;
    const [user, setUser] = useState<{ nickname: string; email: string} | null>(null);


    useEffect(() => {
        setUser(getUser() as any);
    }, []);

    useEffect(() => {
        if (!id || isNaN(Number(id))) return;
        const api = new Api();
        api.getAthletic(Number(id)).then(setAthletic);
        api.getCompetitors(Number(id)).then(setCompetitors);
    }, [id]);

    if(!athletic) return <div className="p-8">Carregando...</div>;

    return(
      <div className="max-w-4xl mx-auto p-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Card Atlética */}
          <div className="flex-1 bg-white rounded-xl shadow p-8">
            <h1 className="text-2xl font-bold mb-6">Detalhes da Atlética</h1>
            {athletic.logo && (
              <div className="mb-4 text-center">
                <span className="block text-sm text-gray-500 mb-1">Logo cadastrada:</span>
                <img src={athletic.logo} alt="Logo da atlética" className="h-20 mx-auto rounded" />
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-semibold mb-1">Nome da Atlética</label>
                <div className="border rounded px-3 py-2 w-full bg-gray-50">{athletic.nome}</div>
              </div>
              <div>
                <label className="block font-semibold mb-1">ID</label>
                <div className="border rounded px-3 py-2 w-full bg-gray-50">{athletic.id}</div>
              </div>
              {user && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
                  onClick={() => router.push(`/athletics/${athletic.id}/edit`)}
                >
                  Editar Atlética
                </button>
              )}
            </div>
          </div>
          {/* Card Competidores */}
          <div className="w-full md:w-96 bg-white rounded-xl shadow p-8 h-fit">
            <h2 className="text-xl font-semibold mb-4">Competidores</h2>
            {competitors.length === 0 ? (
              <div className="text-gray-500">Nenhum competidor cadastrado.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {competitors.map((comp) => (
                  <li key={comp.matricula} className="py-2 flex flex-col">
                    <span className="font-medium">{comp.nome}</span>
                    <span className="text-xs text-gray-500">Matrícula: {comp.matricula}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
}