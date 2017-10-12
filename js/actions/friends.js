import {
  SOCKET_FRIEND
} from '../constants/friends';

export function socketFriend(friend) {
  return {
    type: SOCKET_FRIEND,
    friend,
  };
}
