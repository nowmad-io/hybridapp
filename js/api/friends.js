import { apiCall } from '../requests';

import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_ERROR,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSINCOMING_ERROR,
  FETCH_FRIENDSOUTGOING_SUCCESS,
  FETCH_FRIENDSOUTGOING_ERROR,
  SEND_FRIENDSHIP_SUCCESS,
  SEND_FRIENDSHIP_ERROR,
  ACCEPT_FRIENDSHIP_SUCCESS,
  CANCEL_FRIENDSHIP_SUCCESS,
  REJECT_FRIENDSHIP_SUCCESS,
} from '../constants/friends';
import { FRIENDS_SEARCH, FRIENDS_SEARCH_ERROR } from '../constants/search';

import { REQUEST_ERROR } from '../constants/utils';

const PATH = 'friends/';
const FRIENSHIPS_PATH = 'friendships/';

export function friendsSearch(query) {
  return apiCall(FRIENDS_SEARCH, FRIENDS_SEARCH_ERROR, 'get', `${PATH}search/`, {}, { query });
}

export function fetchFriends() {
  return apiCall(FETCH_FRIENDS_SUCCESS, FETCH_FRIENDS_ERROR, 'get', PATH);
}

export function fetchIncomingRequests() {
  return apiCall(FETCH_FRIENDSINCOMING_SUCCESS, FETCH_FRIENDSINCOMING_ERROR, 'get', `${FRIENSHIPS_PATH}incoming/`);
}

export function fetchOutgoingRequests() {
  return apiCall(FETCH_FRIENDSOUTGOING_SUCCESS, FETCH_FRIENDSOUTGOING_ERROR, 'get', `${FRIENSHIPS_PATH}outgoing/`);
}

export function sendFriendship(friendship) {
  return apiCall(SEND_FRIENDSHIP_SUCCESS, SEND_FRIENDSHIP_ERROR, 'post', `${FRIENSHIPS_PATH}`, { ...friendship });
}

export function acceptFriendship(id) {
  return apiCall(ACCEPT_FRIENDSHIP_SUCCESS, REQUEST_ERROR, 'get', `${FRIENSHIPS_PATH}accept/${id}/`);
}

export function rejectFriendship(id) {
  return apiCall(REJECT_FRIENDSHIP_SUCCESS, REQUEST_ERROR, 'get', `${FRIENSHIPS_PATH}reject/${id}/`);
}

export function cancelFriendship(id) {
  return apiCall(CANCEL_FRIENDSHIP_SUCCESS, REQUEST_ERROR, 'get', `${FRIENSHIPS_PATH}cancel/${id}/`);
}
