import {
  Api, apiGet, apiPost, apiPut,
} from '../libs/requests';

import {
  LOGOUT,
  ME,
  UPDATE_PROFILE,
  AUTHENTICATE,
} from '../constants/auth';

export function apiLogin(data) {
  return Api.post('auth/token/create/', { params: data });
}

export function apiRegister(data) {
  return Api.post('auth/register/', { params: data });
}

export function authenticate(token) {
  return {
    type: AUTHENTICATE,
    token,
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
