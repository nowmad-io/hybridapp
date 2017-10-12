import Config from 'react-native-config'

import { all, takeLatest, select } from 'redux-saga/effects';

import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

export const _openSocket = (socket) =>
function * openSocket() {
  const token = yield select((state) => state.auth.token);

  socket.on('connected', function () {
    socket.emit('authenticate', { token });
  });

  socket.connect();
}

export const _closeSocket = (socket) =>
function * closeSocket() {
  socket.close();
}

export default function _root(socket) {
  return function * root() {
    yield takeLatest(RUN_SAGAS, _openSocket(socket));
    yield takeLatest(STOP_SAGAS, _closeSocket(socket));
  }
}
