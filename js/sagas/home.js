import {
  put, takeLatest, call, take, select, fork, all,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { denormalize } from 'normalizr';
import _ from 'lodash';

import PictureUpload from '../libs/pictureUpload';
import NavigationService from '../libs/navigationService';
import { apiCall } from '../libs/requests/actions';

import {
  ADD_REVIEW,
  UPDATE_REVIEW,
} from '../constants/reviews';
import { GET_GEOLOCATION } from '../constants/home';
import { RUN_SAGAS, STOP_SAGAS } from '../constants/utils';
import { FETCH_FRIENDSINCOMING, ACCEPT_FRIENDSHIP, FETCH_FRIENDS } from '../constants/friends';

import { apiMe } from '../actions/auth';
import {
  fetchPlaces, fetchCategories, addReview, simpleReviewSchema, updatePictures, updatePicture,
} from '../actions/reviews';
import { fetchFriends, fetchIncomingRequests, fetchOutgoingRequests } from '../actions/friends';

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

function* currentPosition() {
  const channel = yield call(getCurrentPosition);

  const action = yield take(channel);
  yield put(action);
}

function* syncReviews() {
  const { entities } = yield select();
  const { reviews } = entities;

  yield all(_.filter(reviews, { toSync: true }).map((review) => {
    const {
      place: { reviews: list, ...place }, ...reviewToUpdate
    } = denormalize(review, simpleReviewSchema, entities);
    return put(apiCall(addReview({
      ...reviewToUpdate,
      place,
    })));
  }));
}

function* homeFlow() {
  yield put(fetchPlaces());
  yield put(fetchCategories());
  yield put(apiMe());
  yield put(fetchOutgoingRequests());

  yield fork(syncReviews);
  yield fork(pollSaga(fetchIncomingRequests, `${FETCH_FRIENDSINCOMING}_SUCCESS`, STOP_SAGAS));
  yield fork(pollSaga(fetchFriends, `${FETCH_FRIENDS}_SUCCESS`, STOP_SAGAS));
}

function* uploadPicture(picture, reviewId) {
  if (picture.uri.startsWith('http')) {
    return picture;
  }

  yield put(updatePicture(reviewId, { ...picture, loading: true }));

  const channel = yield call(() => eventChannel((emit) => {
    PictureUpload(
      picture.path,
      uri => emit({ uri }),
      error => emit({ error }),
    );
    return () => {};
  }));

  const { uri, error } = yield take(channel);

  const updatedPicture = {
    ...picture,
    uri: uri || picture.uri,
    loading: false,
    error,
  };

  yield put(updatePicture(reviewId, updatedPicture));

  return updatedPicture;
}

function* reviewFlow(action) {
  const { id, pictures } = action.payload.params;

  yield call(NavigationService.back);

  const uploadedPictures = yield all(pictures.map(picture => call(uploadPicture, picture, id)));

  yield put(updatePictures(id, { pictures: _.filter(uploadedPictures, pic => !pic.error) }));
}

function* updatePlaces(action) {
  const { type, payload } = action;
  const { friends: { all: allFriends } } = yield select();

  if (type === `${ACCEPT_FRIENDSHIP}_SUCCESS` || payload.length !== allFriends.length) {
    yield put(fetchPlaces());
  }
}

export default function* root() {
  yield takeLatest(RUN_SAGAS, homeFlow);
  yield takeLatest(GET_GEOLOCATION, currentPosition);
  yield takeLatest([`${ADD_REVIEW}_REQUEST`, `${UPDATE_REVIEW}_REQUEST`], reviewFlow);
  yield takeLatest([`${ACCEPT_FRIENDSHIP}_SUCCESS`, `${FETCH_FRIENDS}_SUCCESS`], updatePlaces);
}
