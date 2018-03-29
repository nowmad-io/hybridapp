import { put, takeLatest } from 'redux-saga/effects';

import { NEARBY } from '../constants/search';

import { nearby } from '../actions/search';


function* nearbyFlow(actions) {
  const { error, payload } = actions;

  if (!error) {
    yield put(nearby(payload));
  }
}

export default function* root() {
  yield takeLatest([`${NEARBY}_SUCCESS`, `${NEARBY}_ERROR`], nearbyFlow);
}
