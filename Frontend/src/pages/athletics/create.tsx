import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { CreateAthleticData, Athletic } from '../../lib/types';
import { useRouter } from 'next/router';

export default function CreateAthleticPage() {
  const [form, setForm] = useState<CreateAthleticData>({ nome: '', logo: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sampleImage, setSampleImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const api = new Api();
    api.getAthletics().then((athletics: Athletic[]) => {
      const firstWithLogo = athletics.find(a => a.logo);
      if (firstWithLogo && firstWithLogo.logo) {
        setSampleImage(firstWithLogo.logo);
      }
    });
  }, []);

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
      await api.createAthletic({
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
      <h1 className="text-2xl font-bold mb-6">Cadastrar Atlética</h1>
      {sampleImage && (
        <div className="mb-4 text-center">
          <span className="block text-sm text-gray-500 mb-1">Exemplo de logo já cadastrado:</span>
          <img src={sampleImage} alt="Logo exemplo" className="h-20 mx-auto rounded" />
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
          <label className="block font-semibold mb-1">Logo (imagem)</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => document.getElementById('logo-input')?.click()}
            >
              Escolher Logo
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
          {loading ? 'Salvando...' : 'Cadastrar Atlética'}
        </button>
      </form>
    </div>
  );
}