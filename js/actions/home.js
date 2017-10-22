import {
  GEOLOCATION,
  SELECTED_PLACE,
  LEVEL_CHANGE
} from '../constants/home';

export function setGeolocation(position) {
  return {
    type: GEOLOCATION,
    position,
  };
}

export function selectedPlace(id) {
  return {
    type: SELECTED_PLACE,
    id,
  };
}

export function levelChange(level) {
  return {
    type: LEVEL_CHANGE,
    level,
  };
}
