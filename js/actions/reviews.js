import {
  ADD_UPDATE_REVIEW
} from '../constants/reviews';

export function addOrUpdateReview(review) {
  return {
    type: ADD_UPDATE_REVIEW,
    review,
  };
}
