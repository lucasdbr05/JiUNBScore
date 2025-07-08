import { useState } from 'react';
import type { LoginData, SignUpData } from '../lib/types';

interface AuthCardProps {
  user: { nickname: string; email: string } | null;
  onLogin: (data: LoginData) => Promise<void>;
  onSignUp: (data: SignUpData) => Promise<void>;
  onLogout: () => void;
}

export function AuthCard({ user, onLogin, onSignUp, onLogout }: AuthCardProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState<{ nickname: string; password: string; email?: string }>({
    nickname: '',
    password: '',
    email: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    return (
      <div className="bg-white rounded-xl shadow p-6 w-80 flex flex-col items-center gap-4">
        <div className="text-lg font-semibold">Bem-vindo, {user?.nickname}!</div>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onLogout}>
          Logout
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await onLogin({ nickname: form.nickname, password: form.password });
      } else {
        await onSignUp({ nickname: form.nickname, password: form.password, email: form.email || '' });
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-80 flex flex-col gap-4">
      <div className="flex justify-between mb-2">
        <button
          className={`px-2 py-1 rounded ${mode === 'login' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={`px-2 py-1 rounded ${mode === 'signup' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('signup')}
        >
          Sign Up
        </button>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="border rounded px-3 py-2"
          name="nickname"
          placeholder="Nickname"
          value={form.nickname}
          onChange={handleChange}
          required
        />
        {mode === 'signup' && (
          <input
            className="border rounded px-3 py-2"
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        )}
        <input
          className="border rounded px-3 py-2"
          name="password"
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          className="mt-2 px-4 py-2 border-black bg-yellow-400 text-white rounded hover:bg-white hover:text-black disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Enviando...' : mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
