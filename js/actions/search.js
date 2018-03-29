import {
  NEARBY,
  NEARBY_LOADING,
  PLACES_LOADING,
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
