import { apiGet, apiPost, apiPut } from '../libs/requests';

import {
  LOGIN,
  REGISTER,
  LOGOUT,
  ME,
  UPDATE_PROFILE,
} from '../constants/auth';

export function apiLogin(data) {
  return apiPost(LOGIN, 'auth/token/create/', data);
}

export function apiRegister(data) {
  return apiPost(REGISTER, 'auth/register/', data);
}

export function register(data) {
  return {
    type: REGISTER,
    data,
  };
}

export function apiLogout() {
  return apiPost(LOGOUT, 'auth/token/destroy/');
}

export function apiMe() {
  return apiGet(ME, 'auth/me/');
}

export function updateProfile(data) {
  return {
    type: UPDATE_PROFILE,
    data,
  };
}

export function apiUpdateProfile(data) {
  return apiPut(UPDATE_PROFILE, 'auth/me/', data);
}
