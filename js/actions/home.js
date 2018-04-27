import {
  GET_GEOLOCATION,
  SET_GEOLOCATION,
  LEVEL_CHANGE,
  REGION_CHANGE,
  PLACE_SELECT,
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

export function placeSelect(place) {
  return {
    type: PLACE_SELECT,
    place,
  };
}
