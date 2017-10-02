import { apiCall } from '../requests';

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  REQUEST_ERROR
} from '../constants/auth';

const PATH = 'auth';

export function apiLogin(params = {}) {
  return apiCall(LOGIN_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/login/`, params, {});
}

export function apiRegister(data = {}) {
  return apiCall(REGISTER_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/register/`, {}, data);
}

export function apiLogout(data = {}) {
  return apiCall(LOGOUT_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/logout/`, {}, data);
}
