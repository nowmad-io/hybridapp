import {
  ADD_REVIEW,
  UPDATE_REVIEW
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
