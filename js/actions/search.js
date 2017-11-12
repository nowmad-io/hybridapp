import {
  NEARBY,
  FOCUS
} from '../constants/search';

export function nearby(places) {
  return {
    type: NEARBY,
    places,
  };
}

export function setFocus(focus) {
  return {
    type: FOCUS,
    focus,
  };
}
