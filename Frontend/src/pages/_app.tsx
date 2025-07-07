import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { getUser, login, logout, signUp } from "../lib/auth";
import { Api } from "../lib/apiClient";
import { SportDropdownItem } from "../components/SportDropdown";
import { AuthCard } from "../components/AuthCard";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<{ nickname: string; email: string } | null>(null);
  const [sports, setSports] = useState<SportDropdownItem[]>([]);
  const [selectedSport, setSelectedSport] = useState<number | undefined>(1);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const u = getUser();
    if (typeof u === 'object' && u !== null && 'nickname' in u && 'email' in u) {
      setUser(u as { nickname: string; email: string });
    } else {
      setUser(null);
    }
    const api = new Api();
    api.getSports().then(setSports).catch(() => {
      setSports([
        { id: 1, nome: 'Futebol' },
      ]);
    });
  }, []);

  const handleLogin = async (data: { nickname: string; password: string }) => {
    await login(data);
    setUser(getUser() as { nickname: string; email: string } | null);
    setShowAuth(false);
  };
  const handleSignUp = async (data: { email: string; password: string; nickname: string }) => {
    await signUp(data);
    setUser(getUser() as { nickname: string; email: string } | null);
    setShowAuth(false);
  };
  const handleLogout = () => {
    logout();
    setUser(null);
    setShowAuth(false);
  };

  return (
    <>
      {showAuth && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <AuthCard
            user={user}
            onLogin={handleLogin}
            onSignUp={handleSignUp}
            onLogout={handleLogout}
          />
          <button
            className="absolute top-4 right-4 text-white text-2xl font-bold"
            onClick={() => setShowAuth(false)}
          >
            
          </button>
        </div>
      )}
      <Header
        user={user}
        onAuthClick={() => setShowAuth(true)}
        sports={sports}
        onSportSelect={sport => setSelectedSport(sport?.id)}
      />
      <Component
        {...pageProps}
        selectedSport={selectedSport}
        setSelectedSport={setSelectedSport}
        sports={sports}
      />
    </>
  );
}
