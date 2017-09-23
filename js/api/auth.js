import {
  apiCall,
  fetchRecord
} from 'redux-crud-store';

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  REQUEST_ERROR
} from '../constants/auth';

const PATH = 'auth';
const MODEL = 'me';

export function apiLogin(data = {}) {
  return apiCall(LOGIN_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/login/`, {}, data);
}

export function apiRegister(data = {}) {
  return apiCall(REGISTER_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/register/`, {}, data);
}

export function apiLogout(data = {}) {
  return apiCall(LOGOUT_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/register/`, {}, data);
}

export function getMe(state, params = {}) {
  const fetchConfig = {
    headers: {
      Authorization: `Token ${state.auth.token}`,
    }
  };
  return fetchRecord(MODEL, 'me', `${PATH}/me/`, params, { fetchConfig: fetchConfig });
}
