import { useEffect, useState } from 'react';
import { Api } from '../../../lib/apiClient';
import type { UpdateAthleticData } from '../../../lib/types';
import { useRouter } from 'next/router';

export default function UpdateAthleticPage() {
    const router = useRouter();
    const [form, setForm] = useState<UpdateAthleticData>({id:-1, nome: '', logo: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = router.query;

    useEffect(() => {
        if (!id || isNaN(Number(id))) return; // Só busca se id for válido
        const api = new Api();
        api.getAthletic(Number(id)).then(
            a =>{
                setForm({
                    ...form,
                    id: a.id,
                    nome: a.nome,
                    logo: a.logo == null ? null : a.logo
                })
            }
        )
        }, [id]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            setForm(prev => ({ ...prev, logo: base64 }));
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
        const api = new Api();
        await api.updateAthletic({
            id: form.id,
            nome: String(form.nome),
            logo: form.logo ? String(form.logo) : null
        });
        router.push('/');
        } catch (err: any) {
        setError((err as Error).message || 'Erro ao criar atlética');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow mt-8">
        <h1 className="text-2xl font-bold mb-6">Editar Atlética</h1>
        {form.logo && (
            <div className="mb-4 text-center">
            <span className="block text-sm text-gray-500 mb-1">Logo atual:</span>
            <img src={form.logo} alt="Logo atual" className="h-20 mx-auto rounded border" />
            </div>
        )}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <label className="block font-semibold mb-1">Nome da Atlética</label>
            <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full"
                placeholder="Nome da Atlética"
                required
            />
            </div>
            <div>
            <label className="block font-semibold mb-1">Nova Logo (opcional)</label>
            <div className="flex items-center gap-4">
                <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => document.getElementById('logo-input')?.click()}
                >
                Escolher Nova Logo
                </button>
                <input
                id="logo-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                />
                {form.logo && (
                <img src={form.logo} alt="Pré-visualização do logo" className="h-20 rounded border" />
                )}
            </div>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
            disabled={loading}
            >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
        </form>
        </div>
    );
}