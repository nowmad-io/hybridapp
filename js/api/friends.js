import { apiCall, apiGet, apiPost } from '../requests';

import {
  FETCH_FRIENDS,
  FETCH_FRIENDSINCOMING,
  FETCH_FRIENDSOUTGOING,
  SEND_FRIENDSHIP,
  ACCEPT_FRIENDSHIP,
  CANCEL_FRIENDSHIP,
  REJECT_FRIENDSHIP,
} from '../constants/friends';

export function fetchFriends() {
  return apiCall(apiGet(FETCH_FRIENDS, 'friends/'));
}

export function fetchIncomingRequests() {
  return apiCall(apiGet(FETCH_FRIENDSINCOMING, 'friendships/incoming/'));
}

export function fetchOutgoingRequests() {
  return apiCall(apiGet(FETCH_FRIENDSOUTGOING, 'friendships/outgoing/'));
}

export function sendFriendship(friendship) {
  return apiCall(apiPost(SEND_FRIENDSHIP, 'friendships/', { ...friendship }));
}

export function acceptFriendship(id) {
  return apiCall(apiGet(ACCEPT_FRIENDSHIP, `friendships/accept/${id}/`, {}, null, null, {}, { id }));
}

export function rejectFriendship(id) {
  return apiCall(apiGet(REJECT_FRIENDSHIP, `friendships/reject/${id}/`, {}, null, null, {}, { id }));
}

export function cancelFriendship(id) {
  return apiCall(apiGet(CANCEL_FRIENDSHIP, `friendships/cancel/${id}/`, {}, null, null, {}, { id }));
}
