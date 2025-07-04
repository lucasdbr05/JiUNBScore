import Head from 'next/head';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import { Api } from '../../../lib/apiClient';
import type { Athletic, MatchResult } from '../../../lib/types';
import { getUser } from '@/lib/auth';
import { MarkOptions } from 'perf_hooks';

export default function AthleticPage() {
    const router = useRouter();
    const [athletic, setAthletic] = useState<Athletic | null>(null);
    const [loading, setLoading] = useState(false);
    const { id }  = router.query;
    const [user, setUser] = useState<{ nickname: string; email: string} | null>(null);
    const [lastResults, setLastResults] = useState<MatchResult[]>([]);

    useEffect(() => {
        setUser(getUser() as any);
    }, []
    );

    useEffect(() => {
        if (!id) return;
        const api = new Api();
        api.getAthletic(Number(id)).then(setAthletic);
        api.getMatchesByAthletic(Number(id)).then(setLastResults);
    }, [id]
    );

    if(!athletic) return <div className="p-8">Carregando...</div>;


} 