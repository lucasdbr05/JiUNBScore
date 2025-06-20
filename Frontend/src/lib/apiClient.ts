
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
  UpdateAthleticData
} from "./types";


export class Api {
    api;
    constructor() {
        this.api = new HttpClient("http://localhost:5219", { credentials: 'include' });
    }

    // Auth

    async login(data: LoginData) {
        return await this.api.post("/auth/login", data);
    }

    async signUp(data: SignUpData) {
        return await this.api.post("/auth/signUp", data);
    }

    
    // Matches
    async getMatches(): Promise<Match[]> {
        return await this.api.get("/match");
    }

    async getMatch(id: number): Promise<Match> {
        return await this.api.get(`/match/${id}`);
    }

    async registerMatch(data: RegisterMatchData): Promise<Match> {
        return await this.api.post("/match/register", data);
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
}