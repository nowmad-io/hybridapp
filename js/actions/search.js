import {
  NEARBY,
  FOCUS,
  SEARCH_TYPE
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

export function searchType(typeSearch) {
  return {
    type: SEARCH_TYPE,
    typeSearch,
  };
}
