import { all, fork, takeLatest, put, call, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS
} from '../constants/friends';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';
import { AddNewFriend, NewOutgoingRequest, NewIncomingRequest,
  DeleteOutgoingRequest, DeleteIncomingRequest } from '../actions/friends';

function subscribe({socket, me}) {
  return eventChannel(emit => {
    socket.on('friend.new', function ({ friend }) {
      emit(AddNewFriend(friend));
    });
    socket.on('friend.create', function ({ request }) {
      if (request.from_user.id === me.id) {
        emit(NewOutgoingRequest(request));
      } else {
        emit(NewIncomingRequest(request));
      }
    });
    socket.on('friend.reject', function ({ request }) {
      if (request.from_user.id === me.id) {
        emit(DeleteOutgoingRequest(request));
      } else {
        emit(DeleteIncomingRequest(request));
      }
    });
    return () => {};
  });
}

export const _friendsFlow = (socket) =>
function * friendsFlow() {
  yield put(fetchFriends());
  yield put(fetchIncomingRequests());
  yield put(fetchOutgoingRequests());

  const me = yield select((state) => state.auth.me);
  const channel = yield call(subscribe, {socket, me});
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
