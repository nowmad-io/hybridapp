import { put, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import {
  UPDATE_REVIEW_SUCCESS,
  ADD_REVIEW_SUCCESS,
  REVIEW_ERROR,
} from '../constants/reviews';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';

import { setFromReview } from '../actions/home';
import { addReview, updateReview, reviewLoading } from '../actions/reviews';
import { fetchReviews } from '../api/reviews';
import { pollSaga } from './utils';

export function* reviewsFlow() {
  yield put(fetchReviews());
}

const _reviewFlow = update =>
  function* reviewFlow(action) {
    const { error, payload } = action;

    yield put(reviewLoading(false));

    if (!error) {
      yield put(update ? updateReview(payload) : addReview(payload));
      yield put(NavigationActions.back());
      yield put(setFromReview(true));
    }
  };

export default function* root() {
  yield takeLatest(RUN_SAGAS, reviewsFlow);
  yield takeLatest([UPDATE_REVIEW_SUCCESS, REVIEW_ERROR], _reviewFlow(true));
  yield takeLatest([ADD_REVIEW_SUCCESS, REVIEW_ERROR], _reviewFlow());
}
