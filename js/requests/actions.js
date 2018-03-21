import {
  API_CALL,
  TOKEN,
} from './constants';

export function apiCall(success, failure, method, path, params = {}, data = {}, options = {}) {
  return {
    type: API_CALL,
    meta: {
      success,
      failure,
    },
    payload: {
      method,
      path,
      params,
      data,
      options,
    },
  };
}

export function setToken(token) {
  return {
    type: TOKEN,
    payload: {
      token,
    },
  };
}
