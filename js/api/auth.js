import { apiGet, apiPost } from '../libs/requests';

import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ME,
} from '../constants/auth';

export function apiLogin(data) {
  return apiPost(LOGIN, 'auth/token/create/', data);
}

export function apiRegister(data) {
  return apiPost(REGISTER, 'auth/register/', data);
}

export function apiLogout() {
  return apiPost(LOGOUT, 'auth/token/destroy/');
}

export function apiMe() {
  return apiGet(ME, 'auth/me/');
}
