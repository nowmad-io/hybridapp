import { put, fork, takeLatest, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';
import {
  NEARBY_SUCCESS,
  NEARBY_ERROR,
  NEARBY
} from '../constants/home';

import { setGeolocation, nearby } from '../actions/home';


function * nearbyFlow(actions) {
  const { error, payload } = actions;

  if (!error) {
    yield put(nearby(payload));
  }
}

function getCurrentPosition() {
  return eventChannel(emit => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        emit(setGeolocation(position.coords))
      },
      (error) => {console.log('error', error)},
      { timeout: 5000, maximumAge: (60 * 24 * 1000) },
    );
    return () => {};
  });
}

export function * homeFlow() {
  const channel = yield call(getCurrentPosition);

  let action = yield take(channel);
  yield put(action);
}

export default function _root(socket) {
  return function * root() {
    yield takeLatest(RUN_SAGAS, homeFlow);
    yield takeLatest([NEARBY_SUCCESS, NEARBY_ERROR], nearbyFlow);
  }
}
