import {
  SOCKET_FRIEND_ACCEPT
} from '../constants/friends';

export function socketFriend(friend) {
  return {
    type: SOCKET_FRIEND_ACCEPT,
    friend,
  };
}
