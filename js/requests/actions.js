import { REQUEST, API_CALL, CONNECTION_CHANGE, FETCH_OFFLINE_MODE } from './constants';

function requestAction(type, method, path, params, data, schema, parser, options) {
  return {
    type: type + REQUEST,
    meta: {
      originalType: type,
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

export function apiCall(request) {
  return {
    ...request,
    type: request.meta.originalType + API_CALL,
  };
}

export function apiGet(type, path, params = {}, schema = null, parser = null, options = {}) {
  return requestAction(type, 'get', path, {}, params, schema, parser, options);
}

export function apiPost(type, path, data = {}, schema = null, parser = null, options = {}) {
  return requestAction(type, 'post', path, data, {}, schema, parser, options);
}

export function apiPut(type, path, data = {}, schema = null, parser = null, options = {}) {
  return requestAction(type, 'put', path, data, {}, schema, parser, options);
}

export function apiDelete(type, path, schema = null, parser = null, options = {}) {
  return requestAction(type, 'delete', path, {}, {}, schema, parser, options);
}

export function connectionChange(isConnected) {
  return {
    type: CONNECTION_CHANGE,
    payload: isConnected,
  };
}

export function fetchOfflineMode(action) {
  return {
    type: FETCH_OFFLINE_MODE,
    payload: action,
  };
}
