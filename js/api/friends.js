import { fetchCollection } from 'redux-crud-store';

import {
  SEARCH_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_ERROR
} from '../constants/auth';

const MODEL_FRIENDS = 'friends';
const PATH = 'friends/';

const MODEL_FRIENSHIPS_INCOMING = 'friendships_incoming';
const MODEL_FRIENSHIPS_OUTGOING = 'friendships_outgoing';
const FRIENSHIPS_PATH = 'friendships/';

const fetchConfig = (state) => {
  const token = state.auth.token;
  return {
    headers: {
      Authorization: token ? `Token ${token}` : null,
    },
  };
};

export function fetchFriends(state, params = {}) {
  return fetchCollection(MODEL_FRIENDS, PATH, params, { fetchConfig: fetchConfig(state) });
}

export function fetchIncomingRequests(state, params = {}) {
  return fetchCollection(MODEL_FRIENSHIPS_INCOMING, `${FRIENSHIPS_PATH}incoming/`, params, { fetchConfig: fetchConfig(state) });
}

export function fetchOutgoingRequests(state, params = {}) {
  return fetchCollection(MODEL_FRIENSHIPS_OUTGOING, `${FRIENSHIPS_PATH}outgoing/`, params, { fetchConfig: fetchConfig(state) });
}

export function searchFriends(state, email) {
  return apiCall(SEARCH_FRIENDS_SUCCESS, SEARCH_FRIENDS_ERROR, 'get', `${PATH}search/`, { fetchConfig: fetchConfig(state) }, { email: email });
}
