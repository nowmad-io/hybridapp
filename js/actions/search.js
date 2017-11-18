import {
  NEARBY,
  NEARBY_LOADING,
  PLACES_LOADING,
  REVIEWS_LOADING,
  FRIENDS_LOADING,
} from '../constants/search';

export function nearby(places) {
  return {
    type: NEARBY,
    places,
  };
}

export function nearbyLoading(loading) {
  return {
    type: NEARBY_LOADING,
    loading,
  };
}

export function placesLoading(loading) {
  return {
    type: PLACES_LOADING,
    loading,
  };
}

export function reviewsLoading(loading) {
  return {
    type: REVIEWS_LOADING,
    loading,
  };
}

export function friendsLoading(loading) {
  return {
    type: FRIENDS_LOADING,
    loading,
  };
}
