import {
  ADD_REVIEW,
  UPDATE_REVIEW,
  REVIEW_LOADING
} from '../constants/reviews';

export function addReview(review) {
  return {
    type: ADD_REVIEW,
    review,
  };
}

export function updateReview(review) {
  return {
    type: UPDATE_REVIEW,
    review,
  };
}

export function reviewLoading(loading) {
  return {
    type: REVIEW_LOADING,
    loading,
  };
}
