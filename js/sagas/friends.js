import { all, fork, take } from 'redux-saga/effects';

import {
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDSINCOMING_SUCCESS,
  FETCH_FRIENDSOUTGOING_SUCCESS
} from '../constants/friends';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';

import { pollSaga } from './utils';

export default function * root() {
  yield take(RUN_SAGAS);

  yield all([
    fork(pollSaga(fetchFriends, FETCH_FRIENDS_SUCCESS, STOP_SAGAS)),
    fork(pollSaga(fetchIncomingRequests, FETCH_FRIENDSINCOMING_SUCCESS, STOP_SAGAS)),
    fork(pollSaga(fetchOutgoingRequests, FETCH_FRIENDSOUTGOING_SUCCESS, STOP_SAGAS))
  ]);
}
