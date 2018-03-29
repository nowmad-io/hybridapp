import { API_CALL } from './constants';

function apiCall(type, method, path, params, data, schema) {
  return {
    type: API_CALL,
    meta: {
      request: `${type}_REQUEST`,
      success: `${type}_SUCCESS`,
      failure: `${type}_FAILURE`,
    },
    payload: {
      method,
      path,
      params,
      data,
      schema,
    },
  };
}

export function apiGet(type, path, params = {}, schema = null) {
  apiCall(type, 'get', path, params, {}, schema);
}

export function apiPost(type, path, data = {}, schema = null) {
  apiCall(type, 'post', path, {}, data, schema);
}

export function apiPut(type, path, data = {}, schema = null) {
  apiCall(type, 'put', path, {}, data, schema);
}

export function apiDelete(type, path) {
  apiCall(type, 'delete', path, {}, {});
}
