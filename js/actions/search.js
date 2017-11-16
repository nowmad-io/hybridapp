import {
  NEARBY,
  FOCUS,
  SEARCH_TYPE,
  PLACES_SEARCH,
  NEARBY_LOADING,
  PLACES_LOADING,
  REVIEWS_LOADING,
  FRIENDS_LOADING,
  PLACES_SEARCH_ERROR
} from '../constants/search';

export function nearby(places) {
  return {
    type: NEARBY,
    places,
  };
}

export function setFocus(focused) {
  return {
    type: FOCUS,
    focused,
  };
}

export function searchType(typeSearch) {
  return {
    type: SEARCH_TYPE,
    typeSearch,
  };
}

export function placesSearch(places) {
  return {
    type: PLACES_SEARCH,
    places,
  };
}

export function placesSearchError() {
  return {
    type: PLACES_SEARCH_ERROR
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
