import { API_CALL } from './constants';

function apiCall(type, method, path, params, data, schema, options) {
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
      options,
      params,
      data,
      schema,
    },
  };
}

export function apiGet(type, path, params = {}, schema = null, options = {}) {
  return apiCall(type, 'get', path, {}, params, schema, options);
}

export function apiPost(type, path, data = {}, schema = null, options = {}) {
  return apiCall(type, 'post', path, data, {}, schema, options);
}

export function apiPut(type, path, data = {}, schema = null, options = {}) {
  return apiCall(type, 'put', path, data, {}, schema, options);
}

export function apiDelete(type, path, schema = null, options = {}) {
  return apiCall(type, 'delete', path, {}, {}, schema, options);
}
