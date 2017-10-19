import {
  GEOLOCATION,
  SELECTED_PLACE
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
