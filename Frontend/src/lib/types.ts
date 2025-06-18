// Auth
export interface LoginData {
  nickname: string;
  senha: string;
}

export interface SignUpData {
  nickname: string;
  email: string;
  senha: string;
}

// Match
export interface RegisterMatchData {
  idEdicao: number;
  idFase: number;
  idLocal: number;
  idTime1: number;
  idTime2: number;
  date: string;
}

export interface Match {
  id: number;
  placar_time_1: number | null;
  placar_time_2: number | null;
  id_edicao: number | null;
  id_fase: number | null;
  id_local: number | null;
  id_time_1: number | null;
  id_time_2: number | null;
  date: string;
}

// Fase
export interface Fase {
  id: number;
  ordem: number;
  nome_grupo: string;
  nome_etapa: string;
}

export interface CreateFaseData {
  ordem: number;
  nomeGrupo: string;
  nomeEtapa: string;
}

export interface UpdateFaseData extends CreateFaseData {
  id: number;
}

// Athletic
export interface Athletic {
  id: number;
  nome: string;
  logo?: string | null;
}

export interface CreateAthleticData {
  nome: string;
  logo?: string | null;
}

export interface UpdateAthleticData extends CreateAthleticData {
  id: number;
}
