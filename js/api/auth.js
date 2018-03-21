import { apiCall } from '../requests';

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  ME_SUCCESS,
  ME_ERROR,
} from '../constants/auth';

import { REQUEST_ERROR } from '../constants/utils';

const PATH = 'auth';

export function apiLogin(params = {}) {
  return apiCall(LOGIN_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/token/create/`, params);
}

export function apiRegister(params = {}) {
  return apiCall(REGISTER_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/register/`, params);
}

export function apiLogout() {
  return apiCall(LOGOUT_SUCCESS, LOGOUT_ERROR, 'post', `${PATH}/token/destroy/`);
}

export function apiMe() {
  return apiCall(ME_SUCCESS, ME_ERROR, 'get', `${PATH}/me/`);
}
