import {
  SEARCH_RESULTS,
  BOUNDS_CHANGES,
  MARKER_SELECTED,
  SEARCH_SELECTED,
  UNSELECT
} from '../constants/reviews';

export function displayResults(data, center) {
  return {
    type: SEARCH_RESULTS,
    data,
    center
  };
}

export function changeBounds(bounds, center) {
  return {
    type: BOUNDS_CHANGES,
    bounds,
    center
  };
}

export function selectMarker(marker) {
  return {
    type: MARKER_SELECTED,
    marker
  };
}

export function selectSearch(search) {
  return {
    type: SEARCH_SELECTED,
    search
  };
}

export function unselect() {
  return {
    type: UNSELECT
  };
}
