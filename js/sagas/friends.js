import { all, fork, takeLatest, put, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS
} from '../constants/friends';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';
import { socketFriend } from '../actions/friends';

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('friend.accept', function ({ data }) {
      emit(socketFriend(data));
    });
    return () => {};
  });
}

export const _friendsFlow = (socket) =>
function * friendsFlow() {
  yield put(fetchFriends());
  yield put(fetchIncomingRequests());
  yield put(fetchOutgoingRequests());

  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export default function _root(socket) {
  return function * root() {
    yield takeLatest(RUN_SAGAS, _friendsFlow(socket));
  }
}
