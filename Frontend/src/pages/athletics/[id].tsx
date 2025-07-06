import Head from 'next/head';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Athletic } from '../../lib/types';
import { getUser } from '@/lib/auth';
import { MarkOptions } from 'perf_hooks';

export default function AthleticPage() {
    const router = useRouter();
    const [athletic, setAthletic] = useState<Athletic | null>(null);
    const { id }  = router.query;
    const [user, setUser] = useState<{ nickname: string; email: string} | null>(null);


    useEffect(() => {
        setUser(getUser() as any);
    }, []
    );

    useEffect(() => {
        if (!id) return;
        const api = new Api();
        api.getAthletic(Number(id))
            .then(setAthletic)
    }, [id]
    );

    if(!athletic) return <div className="p-8">Carregando...</div>;

    return(
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow mt-8">
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
    );
}