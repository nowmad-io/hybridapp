import { apiCall } from '../requests';

import {
  PLACES_SUCCESS,
  PLACES_ERROR,
  UPDATE_REVIEW_SUCCESS,
  ADD_REVIEW_SUCCESS,
  REVIEW_ERROR,
} from '../constants/reviews';
import { REVIEWS_SEARCH, REVIEWS_SEARCH_ERROR } from '../constants/search';
import { SEARCHED_PLACES } from '../constants/home';

const PLACES_PATH = 'places/';
const REVIEWS_PATH = 'reviews/';

export function fetchReviews() {
  return apiCall(PLACES_SUCCESS, PLACES_ERROR, 'get', PLACES_PATH);
}

export function addReview(review) {
  return apiCall(ADD_REVIEW_SUCCESS, REVIEW_ERROR, 'post', REVIEWS_PATH, review);
}

export function updateReview(review) {
  return apiCall(UPDATE_REVIEW_SUCCESS, REVIEW_ERROR, 'put', `${REVIEWS_PATH}${review.id}/`, review);
}

export function reviewsSearchByQuery(query) {
  return apiCall(REVIEWS_SEARCH, REVIEWS_SEARCH_ERROR, 'get', PLACES_PATH, {}, { query });
}

export function reviewsSearchByUser(email) {
  return apiCall(SEARCHED_PLACES, REVIEWS_SEARCH_ERROR, 'get', PLACES_PATH, {}, { user: email });
}
