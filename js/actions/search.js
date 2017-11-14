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
