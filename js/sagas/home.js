import { put, takeLatest, call, take, select, fork } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { eventChannel } from 'redux-saga';

import {
  ADD_REVIEW,
  UPDATE_REVIEW,
} from '../constants/reviews';
import { GET_GEOLOCATION } from '../constants/home';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';
import { FETCH_FRIENDSINCOMING, ACCEPT_FRIENDSHIP, FETCH_FRIENDS } from '../constants/friends';

import { apiMe } from '../api/auth';
import { fetchPlaces, fetchCategories } from '../api/reviews';
import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../api/friends';

import { setGeolocation } from '../actions/home';

import { pollSaga } from './utils';

function getCurrentPosition() {
  return eventChannel((emit) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        emit(setGeolocation(position.coords));
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000, maximumAge: (60 * 24 * 1000) },
    );
    return () => {};
  });
}

export function* currentPosition() {
  const channel = yield call(getCurrentPosition);

  const action = yield take(channel);
  yield put(action);
}

export function* homeFlow() {
  yield put(fetchPlaces());
  yield put(fetchCategories());
  yield put(apiMe());
  yield put(fetchOutgoingRequests());

  yield fork(pollSaga(fetchIncomingRequests, `${FETCH_FRIENDSINCOMING}_SUCCESS`, STOP_SAGAS));
  yield fork(pollSaga(fetchFriends, `${FETCH_FRIENDS}_SUCCESS`, STOP_SAGAS));
}

function* reviewFlow() {
  yield put(NavigationActions.back());
}

function* updatePlaces(action) {
  const { type, payload } = action;
  const { friends: { all } } = yield select();

  if (type === `${FETCH_FRIENDS}_SUCCESS` || payload.length !== all.length) {
    yield put(fetchPlaces());
  }
}

export default function* root() {
  yield takeLatest(RUN_SAGAS, homeFlow);
  yield takeLatest(GET_GEOLOCATION, currentPosition);
  yield takeLatest([`${ADD_REVIEW}_REQUEST`, `${UPDATE_REVIEW}_REQUEST`], reviewFlow);
  yield takeLatest([`${ACCEPT_FRIENDSHIP}_SUCCESS`, `${FETCH_FRIENDS}_SUCCESS`], updatePlaces);
}
