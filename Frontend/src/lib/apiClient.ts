import { HttpClient } from "./httpClient";
import type {
  LoginData,
  SignUpData,
  RegisterMatchData,
  Match,
  Fase,
  CreateFaseData,
  UpdateFaseData,
  Athletic,
  CreateAthleticData,
  UpdateAthleticData,
  Edition,
  CreateEditionData,
  UpdateEditionData,
  Sport,
  CreateSportData,
  UpdateSportData,
  EditMatchData,
  MatchResult,
  Statistic,
  CreateStatisticData,
  UpdateStatisticData,
  Competitor,
  Action
} from "./types";



export class Api {
    api;
    constructor() {
        this.api = new HttpClient("http://localhost:5219", { credentials: 'include' });
    }

    // Auth

    async login(data: LoginData): Promise<string> {
        return await this.api.post("/auth/login", data);
    }

    async signUp(data: SignUpData): Promise<string> {
        return await this.api.post("/auth/signUp", data);
    }

    
    // Matches
    async getMatches(): Promise<Match[]> {
        return await this.api.get("/match");
    }

    async getMatch(id: number): Promise<Match> {
        return await this.api.get(`/match/${id}`);
    }

    async createMatch(data: RegisterMatchData): Promise<Match> {
        return await this.api.post("/match", data);
    }
    
    async updateMatch(id: number, data: EditMatchData): Promise<Match> {
        return await this.api.put(`/match/${id}`, data);
    }       

    async deleteMatch(id: number): Promise<void> {
        await this.api.delete(`/match/${id}`);
    }
    
    async getMatchesByAthletic(idAthletic: number) : Promise<MatchResult[]>{
        return await this.api.get(`/match/athletic/${idAthletic}`);
    }

    // Fase
    async getFases(): Promise<Fase[]> {
        return await this.api.get("/fase");
    }

    async getFase(id: number): Promise<Fase> {
        return await this.api.get(`/fase/${id}`);
    }

    async createFase(data: CreateFaseData): Promise<Fase> {
        return await this.api.post("/fase", data);
    }

    async updateFase(id: number, data: UpdateFaseData): Promise<Fase> {
        return await this.api.put(`/fase/${id}`, data);
    }

    async deleteFase(id: number): Promise<Fase> {
        return await this.api.delete(`/fase/${id}`);
    }

    // Athletic
    async getAthletics(): Promise<Athletic[]> {
        return await this.api.get("/athletic");
    }

    async getAthletic(id: number): Promise<Athletic> {
        return await this.api.get(`/athletic/${id}`);
    }

    async createAthletic(data: CreateAthleticData): Promise<Athletic> {
        return await this.api.post("/athletic", data);
    }

    async updateAthletic(data: UpdateAthleticData): Promise<Athletic> {
        return await this.api.put(`/athletic`, data);
    }

    async deleteAthletic(id: number): Promise<Athletic> {
        return await this.api.delete(`/athletic/${id}`);
    }

    // Edition
    async getEditions(): Promise<Edition[]> {
        return await this.api.get("/edition");
    }

    async getEdition(id: number): Promise<Edition> {
        return await this.api.get(`/edition/${id}`);
    }

    async createEdition(data: CreateEditionData): Promise<Edition> {
        return await this.api.post("/edition", data);
    }

    async updateEdition(data: UpdateEditionData): Promise<Edition> {
        return await this.api.put(`/edition`, data);
    }

    async deleteEdition(id: number): Promise<Edition> {
        return await this.api.delete(`/edition/${id}`);
    }

    // Sports
    async getSports(): Promise<Sport[]> {
        return await this.api.get('/sport');
    }

    async getSport(id: number): Promise<Sport> {
        return await this.api.get(`/sport/${id}`);
    }

    async createSport(data: CreateSportData): Promise<Sport> {
        return await this.api.post('/sport', data);
    }

    async updateSport(data: UpdateSportData): Promise<Sport> {
        return await this.api.put('/sport', data);
    }

    async deleteSport(id: number): Promise<Sport> {
        return await this.api.delete(`/sport/${id}`);
    }

    // Estatísticas
    async getStatistics(): Promise<Statistic[]> {
        return await this.api.get("/statistic");
    }

    async getStatistic(id: number): Promise<Statistic> {
        return await this.api.get(`/statistic/${id}`);
    }

    async createStatistic(data: CreateStatisticData): Promise<Statistic> {
        return await this.api.post("/statistic", data);
    }

    async updateStatistic(id: number, data: UpdateStatisticData): Promise<Statistic> {
        return await this.api.put(`/statistic/${id}`, data);
    }

    async deleteStatistic(id: number): Promise<void> {
        await this.api.delete(`/statistic/${id}`);
    }

    // Competidores
    async getCompetitors(
        idTime1?: number, 
        idTime2?: number,
        idEsporte?: number, 
    ): Promise<Competitor[]> {
        return await this.api.get('/competidor/', {
            idTime1, 
            idTime2,
            idEsporte,
        });
    }

    async getCompetitor(id: number): Promise<Competitor> {
        return await this.api.get(`/competidor/${id}`);
    }

    async createCompetitor(data: Omit<Competitor, 'id'>): Promise<Competitor> {
        return await this.api.post('/competidor/', data);
    }

    async updateCompetitor(id: number, data: Partial<Competitor>): Promise<Competitor> {
        return await this.api.put(`/competidor/${id}`, data);
    }

    async deleteCompetitor(id: number): Promise<void> {
        await this.api.delete(`/competidor/${id}`);
    }

    // Ações
    async  getActions(): Promise<Action[]> {
        return await this.api.get('/action');
    }

    // Standings
    async getStandings(editionId: number): Promise<Record<string, any[]>> {
        return await this.api.get(`/edition/standings/${editionId}`);
    }
}