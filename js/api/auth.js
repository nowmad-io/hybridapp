import {
  apiCall as api,
  fetchRecord
} from '../../redux-crud-store';
import { apiCall } from '../requests';

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  REQUEST_ERROR
} from '../constants/auth';

const PATH = 'auth';
const MODEL = 'me';

export function apiLogin(params = {}) {
  return apiCall(LOGIN_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/login/`, params, {});
}

export function apiRegister(data = {}) {
  return api(REGISTER_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/register/`, {}, data);
}

export function apiLogout(data = {}) {
  return api(LOGOUT_SUCCESS, REQUEST_ERROR, 'post', `${PATH}/logout/`, {}, data);
}

export function getMe(state, params = {}) {
  const fetchConfig = {
    headers: {
      Authorization: `Token ${state.auth.token}`,
    }
  };
  return fetchRecord(MODEL, 'me', `${PATH}/me/`, params, { fetchConfig: fetchConfig });
}
