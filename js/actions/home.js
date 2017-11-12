import {
  GEOLOCATION,
  SELECTED_PLACE,
  LEVEL_CHANGE,
  REGION_CHANGE,
  NEARBY,
  NEW_PLACE,
  CURRENT_PLACES
} from '../constants/home';

export function setGeolocation(position) {
  return {
    type: GEOLOCATION,
    position,
  };
}

export function selectedPlace(selectedPlace) {
  return {
    type: SELECTED_PLACE,
    selectedPlace,
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
