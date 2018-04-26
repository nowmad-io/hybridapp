import { apiGet, apiPost } from '../requests';

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
  return apiGet(FETCH_FRIENDS, 'friends/');
}

export function fetchIncomingRequests() {
  return apiGet(FETCH_FRIENDSINCOMING, 'friendships/incoming/');
}

export function fetchOutgoingRequests() {
  return apiGet(FETCH_FRIENDSOUTGOING, 'friendships/outgoing/');
}

export function sendFriendship(friendship) {
  return apiPost(SEND_FRIENDSHIP, 'friendships/', { ...friendship });
}

export function acceptFriendship(id) {
  return apiGet(ACCEPT_FRIENDSHIP, `friendships/accept/${id}/`);
}

export function rejectFriendship(id) {
  return apiGet(REJECT_FRIENDSHIP, 'get', `friendships/reject/${id}/`);
}

export function cancelFriendship(id) {
  return apiGet(CANCEL_FRIENDSHIP, 'get', `friendships/cancel/${id}/`);
}
