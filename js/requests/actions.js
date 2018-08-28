import {
  REQUEST, API_CALL, CONNECTION_CHANGE, FETCH_OFFLINE_MODE,
} from './constants';

function requestAction(type, method, path, params, data, schema, parser, options, extra) {
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
      extra,
    },
  };
}

export function apiCall(request) {
  return {
    ...request,
    type: request.meta.originalType + API_CALL,
  };
}

export function apiGet(
  type, path, data = {}, schema = null, parser = null, options = {}, extra = {},
) {
  return requestAction(type, 'get', path, {}, data, schema, parser, options, extra);
}

export function apiPost(
  type, path, params = {}, schema = null, parser = null, options = {}, extra = {},
) {
  return requestAction(type, 'post', path, params, {}, schema, parser, options, extra);
}

export function apiPut(
  type, path, params = {}, schema = null, parser = null, options = {}, extra = {},
) {
  return requestAction(type, 'put', path, params, {}, schema, parser, options, extra);
}

export function apiDelete(type, path, schema = null, parser = null, options = {}, extra = {}) {
  return requestAction(type, 'delete', path, {}, {}, schema, parser, options, extra);
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
