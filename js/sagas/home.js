import { put, fork, takeLatest, call, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { setGeolocation } from '../actions/home';

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
    yield takeLatest(RUN_SAGAS, homeFlow)
  }
}
