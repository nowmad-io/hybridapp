import { schema } from 'normalizr';

import { apiGet, apiPost, apiPut } from '../requests';
import {
  PLACES,
  CATEGORIES,
  ADD_REVIEW,
  UPDATE_REVIEW,
} from '../constants/reviews';

const userSchema = new schema.Entity('users');
const categorySchema = new schema.Entity('categories');
const pictureSchema = new schema.Entity('pictures');
export const reviewSchema = new schema.Entity('reviews', {
  categories: [categorySchema],
  pictures: [pictureSchema],
  created_by: userSchema,
});
export const placeSchema = new schema.Entity('places', {
  reviews: [reviewSchema],
});

export const simpleReviewSchema = new schema.Entity('reviews', {
  categories: [categorySchema],
  pictures: [pictureSchema],
  created_by: userSchema,
  place: placeSchema,
});

export function fetchCategories() {
  return apiGet(CATEGORIES, 'categories/', {}, [categorySchema]);
}

export function fetchPlaces() {
  return apiGet(PLACES, 'places/', {}, [placeSchema]);
}

export function addReview(data) {
  return apiPost(ADD_REVIEW, 'reviews/', data, placeSchema);
}

export function updateReview(data) {
  return apiPut(UPDATE_REVIEW, `reviews/${data.id}/`, data, placeSchema);
}
