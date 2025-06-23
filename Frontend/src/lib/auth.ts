import { Api } from './apiClient';
import type { LoginData, SignUpData } from './types';
import Cookies from 'js-cookie';

const api = new Api();

export async function login(data: LoginData) {
  const token = await api.login(data);
  Cookies.set('access_token', token, { expires: 7 }); 
  return token;
}
    
export async function signUp(data: SignUpData) {
  const token = await api.signUp(data);
  return token;
}

export function logout() {
  Cookies.remove('access_token');
}

export function getUser() {
  return Cookies.get('access_token') || null;
}
