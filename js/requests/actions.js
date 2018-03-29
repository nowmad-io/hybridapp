import { API_CALL } from './constants';

function apiCall([request, success, failure], method, path, params, data, schema) {
  return {
    type: API_CALL,
    meta: {
      request,
      success,
      failure,
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

export function apiGet(types, path, params = {}, schema = null) {
  apiCall(types, 'get', path, params, {}, schema);
}

export function apiPost(types, path, data = {}, schema = null) {
  apiCall(types, 'post', path, {}, data, schema);
}

export function apiPut(types, path, data = {}, schema = null) {
  apiCall(types, 'put', path, {}, data, schema);
}

export function apiDelete(types, path) {
  apiCall(types, 'delete', path, {}, {});
}
