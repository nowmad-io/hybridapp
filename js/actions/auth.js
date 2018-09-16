import {
  Api, apiGet, apiPost, apiPut,
} from '../libs/requests';

import {
  REGISTER,
  LOGOUT,
  ME,
  UPDATE_PROFILE,
  LOGIN,
} from '../constants/auth';

export function apiLogin(data) {
  return Api.post('auth/token/create/', { params: data });
}

export function loginAction(token) {
  return {
    type: LOGIN,
    token,
  };
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
