import { UPDATE_PICTURE } from '../constants/reviews';

// eslint-disable-next-line import/prefer-default-export
export function updatePicture(reviewId, picture) {
  return {
    type: UPDATE_PICTURE,
    reviewId,
    picture,
  };
}
