import { Api } from './apiClient';
import type { LoginData, SignUpData } from './types';
import Cookies from 'js-cookie';

const api = new Api();

export async function login(data: LoginData) {
  const token = await api.login(data);
  Cookies.set('token', token, { expires: 7 }); 
  return token;
}

export async function signUp(data: SignUpData) {
  const token = await api.signUp(data);
  Cookies.set('token', token, { expires: 7 });
  return token;
}

export function logout() {
  Cookies.remove('token');
}

export function getUser() {
  return Cookies.get('token') || null;
}
