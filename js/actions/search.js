import {
  NEARBY
} from '../constants/search';

export function nearby(places) {
  return {
    type: NEARBY,
    places,
  };
}
