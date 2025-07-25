// Competidor
export interface Competitor {
  nome: string;
  matricula: string;
  idAtletica: number;
}

// Ação
export interface Action {
  id: number;
  nome: string;
  points?: number;
}
// Estatísticas
export interface Statistic {
  id: number;
  qtdAcoes: number;
  idPartida: number;
  idAcao: number;
  idCompetidor: string;
}

export interface CreateStatisticData {
  qtdAcoes: number;
  idPartida: number;
  idAcao: number;
  idCompetidor: string;
}

export interface UpdateStatisticData extends CreateStatisticData {
  id: number;
}
// Auth
export interface LoginData {
  nickname: string;
  password: string;
}

export interface SignUpData {
  nickname: string;
  email: string;
  password: string;
}

// Match
export interface RegisterMatchData {
  idEdicao: number;
  idEsporte: number;
  idFase: number;
  idLocal: number;
  idTime1: number;
  idTime2: number;
  placarTime1: number | null;
  placarTime2: number | null;  
  data: string;
}


export type EditMatchData = {
  id?: number;
  placarTime1?: number;
  placarTime2?: number;
  idEdicao?: number;
  idEsporte?: number;
  idFase?: number;
  idLocal?: number;
  idTime1?: number;
  idTime2?: number;
  data?: string;  
};

export interface Match {
  id: number;
  placar_time_1: number | null;
  placar_time_2: number | null;
  id_edicao: number | null;
  id_esporte: number | null;
  id_fase: number | null;
  id_local: number | null;
  id_time_1: number | null;
  id_time_2: number | null;
  data: string;
}

// Fase
export interface Fase {
  id: number;
  ordem: number;
  nomeGrupo: string;
  nomeEtapa: string;
}

export interface CreateFaseData {
  ordem: number;
  nomeGrupo?: string ;
  nomeEtapa: string;
}

export interface UpdateFaseData extends CreateFaseData {
  id: number;
}

// Athletic
export interface  Athletic {
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

// Edition
export interface Edition {
  id: number;
  data_fim: string;
  data_comeco: string;
}

export interface CreateEditionData {
  dataFim: string;
  dataComeco: string;
  selectedSports: number[];
}

export interface UpdateEditionData extends CreateEditionData {
  id: number;
}

// Sport
export interface Sport {
  id: number;
  nome: string;
}

export interface CreateSportData {
  nome: string;
}

export interface UpdateSportData {
  id: number;
  nome: string;
}

//Ranking
export interface RankingAtleta {
  atletaId: string;
  atletaNome: string;
  atleticaNome: string;
  ranking: number;
}
