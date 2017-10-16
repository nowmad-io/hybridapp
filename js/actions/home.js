import {
  GEOLOCATION
} from '../constants/home';

export function setGeolocation(position) {
  return {
    type: GEOLOCATION,
    position,
  };
}
