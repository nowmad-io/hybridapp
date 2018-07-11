import { API_CALL, CONNECTION_CHANGE } from './constants';

function apiCall(type, method, path, params, data, schema, parser, options) {
  return {
    type: API_CALL,
    meta: {
      request: `${type}_REQUEST`,
      success: `${type}_SUCCESS`,
      failure: `${type}_ERROR`,
    },
    payload: {
      method,
      path,
      options,
      params,
      data,
      schema,
      parser,
    },
  };
}

export function apiGet(type, path, params = {}, schema = null, parser = null, options = {}) {
  return apiCall(type, 'get', path, {}, params, schema, parser, options);
}

export function apiPost(type, path, data = {}, schema = null, parser = null, options = {}) {
  return apiCall(type, 'post', path, data, {}, schema, parser, options);
}

export function apiPut(type, path, data = {}, schema = null, parser = null, options = {}) {
  return apiCall(type, 'put', path, data, {}, schema, parser, options);
}

export function apiDelete(type, path, schema = null, parser = null, options = {}) {
  return apiCall(type, 'delete', path, {}, {}, schema, parser, options);
}

export function connectionChange(isConnected) {
  return {
    type: CONNECTION_CHANGE,
    payload: isConnected,
  };
}
