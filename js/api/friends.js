import { apiCall } from '../requests';

import {
  SEARCH_FRIENDS_SUCCESS,
  SEARCH_FRIENDS_ERROR,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_ERROR,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSINCOMING_ERROR,
  FETCH_FRIENDSOUTGOING_SUCCESS,
  FETCH_FRIENDSOUTGOING_ERROR
} from '../constants/friends';

const PATH = 'friends/';
const FRIENSHIPS_PATH = 'friendships/';

export function fetchFriends() {
  return apiCall(FETCH_FRIENDS_SUCCESS, FETCH_FRIENDS_ERROR, 'get', PATH);
}

export function fetchIncomingRequests(state, params = {}) {
  return apiCall(FETCH_FRIENDSINCOMING_SUCCESS, FETCH_FRIENDSINCOMING_ERROR, 'get', `${FRIENSHIPS_PATH}incoming/`);
}

export function fetchOutgoingRequests(state, params = {}) {
  return apiCall(FETCH_FRIENDSOUTGOING_SUCCESS, FETCH_FRIENDSOUTGOING_ERROR, 'get', `${FRIENSHIPS_PATH}outgoing/`);
}

export function searchFriends(email) {
  return apiCall(SEARCH_FRIENDS_SUCCESS, SEARCH_FRIENDS_ERROR, 'get', `${PATH}search/`, {}, { email: 't@t.com' });
}
