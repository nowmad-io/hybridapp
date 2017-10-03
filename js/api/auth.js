import { apiCall } from '../requests';

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from '../constants/auth';

import { REQUEST_ERROR } from '../constants/utils';

const PATH = 'auth';

export function apiLogin(params = {}) {
  return apiCall(LOGIN_SUCCESS, REQUEST_ERROR, 'POST', `${PATH}/login/`, params);
}

export function apiRegister(params = {}) {
  return apiCall(REGISTER_SUCCESS, REQUEST_ERROR, 'POST', `${PATH}/register/`, params);
}

export function apiLogout() {
  return apiCall(LOGOUT_SUCCESS, REQUEST_ERROR, 'POST', `${PATH}/logout/`);
}
