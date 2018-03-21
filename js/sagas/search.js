import { put, fork, takeLatest, call, take } from 'redux-saga/effects';

import {
  NEARBY_SUCCESS,
  NEARBY_ERROR,
  NEARBY,
} from '../constants/search';

import { nearby } from '../actions/search';


function* nearbyFlow(actions) {
  const { error, payload } = actions;

  if (!error) {
    yield put(nearby(payload));
  }
}

export default function* root() {
  yield takeLatest([NEARBY_SUCCESS, NEARBY_ERROR], nearbyFlow);
}
