import { Api } from './apiClient';
import type { LoginData, SignUpData } from './types';
import Cookies from 'js-cookie';

const api = new Api();

export async function login(data: LoginData) {
  const token = await api.login(data);
  if (token) {
    Cookies.set('access_token', token, { expires: 7 });
    Cookies.set('user_nickname', data.nickname, { expires: 7 });
    Cookies.set('user_email', token, { expires: 7 });
  }
  return token;
}

export async function signUp(data: SignUpData) {
  const token = await api.signUp(data);
  if (token) {
    Cookies.set('access_token', token, { expires: 7 });
    Cookies.set('user_nickname', data.nickname, { expires: 7 });
    Cookies.set('user_email', token, { expires: 7 });
  }
  return token;
}

export function logout() {
  Cookies.remove('access_token');
  Cookies.remove('user_nickname');
  Cookies.remove('user_email');
}

export function getUser() {
  const token = Cookies.get('access_token');
  const nickname = Cookies.get('user_nickname');
  const email = Cookies.get('user_email');
  if (token && nickname && email) {
    return { nickname, email };
  }
  return null;
}
