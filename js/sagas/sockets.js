import Config from 'react-native-config'

import { all, takeLatest } from 'redux-saga/effects';

import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

export const _openSocket = (socket) =>
function * openSocket() {
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
