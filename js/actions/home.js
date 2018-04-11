import {
  GET_GEOLOCATION,
  SET_GEOLOCATION,
  LEVEL_CHANGE,
  REGION_CHANGE,
  NEW_PLACE,
  CURRENT_PLACES,
  GOOGLE_PLACE,
  SEARCHED_PLACES,
  FROM_REVIEW,
  FILTERS_CHANGE,
} from '../constants/home';

export function getGeolocation() {
  return {
    type: GET_GEOLOCATION,
  };
}
export function setGeolocation(position) {
  return {
    type: SET_GEOLOCATION,
    position,
  };
}

export function levelChange(level) {
  return {
    type: LEVEL_CHANGE,
    level,
  };
}

export function regionChanged(region) {
  return {
    type: REGION_CHANGE,
    region,
  };
}

export function filtersChange(categories) {
  return {
    type: FILTERS_CHANGE,
    categories,
  };
}

export function selectNewPlace(place) {
  return {
    type: NEW_PLACE,
    place,
  };
}

export function currentPlacesChange(places) {
  return {
    type: CURRENT_PLACES,
    places,
  };
}

export function googlePlace(place) {
  return {
    type: GOOGLE_PLACE,
    place,
  };
}

export function _searchedPlaces(places) {
  return {
    type: SEARCHED_PLACES,
    places,
  };
}

export function setFromReview(from) {
  return {
    type: FROM_REVIEW,
    from,
  };
}
