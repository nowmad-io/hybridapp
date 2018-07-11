import { API_CALL, CONNECTION_CHANGE, FETCH_OFFLINE_MODE, REMOVE_FROM_ACTION_QUEUE } from './constants';

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

export function fetchOfflineMode(action) {
  return {
    type: FETCH_OFFLINE_MODE,
    payload: action,
  };
}

export function removeActionFromQueue(action) {
  return {
    type: REMOVE_FROM_ACTION_QUEUE,
    payload: action,
  };
}
