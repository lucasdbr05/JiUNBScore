import { useEffect, useState } from 'react';
import { Api } from '../../lib/apiClient';
import type { Athletic, Edition, CreateAthleticData } from '../../lib/types';
import { useRouter } from 'next/router';

export default function createAthleticPage() {

    const [form, setForm] = useState<CreateAthleticData>(
        {
            nome: "",
            logo: null
        }
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (file) {

      const reader = new FileReader();

      reader.onloadend = () => {

        const base64 = reader.result as string;
        setForm (prev => ({
          ...prev,
          logo: base64
        }));

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
        ...form,
        nome:String(form.nome),
        logo:String(form.logo)
      });
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar partida');
    } finally {
      setLoading(false);
    }
  };

  
}