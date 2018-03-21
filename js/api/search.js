import Config from 'react-native-config';

import { apiCall } from '../requests';

import {
  NEARBY_SUCCESS,
  NEARBY_ERROR,
  PLACES_SEARCH,
  PLACES_SEARCH_ERROR,
} from '../constants/search';

export function getNearbyPlaces(place) {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
    key = `key=${Config.PLACES_API_KEY}`,
    location = `location=${place.latitude},${place.longitude}`,
    radius = 'radius=500';

  return apiCall(NEARBY_SUCCESS, NEARBY_ERROR, 'get', `${url}?${key}&${location}&${radius}`);
}

export function placesSearch(query) {
  const url = 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json',
    key = `key=${Config.PLACES_API_KEY}`,
    input = `input=${query}`;

  return apiCall(PLACES_SEARCH, PLACES_SEARCH_ERROR, 'get', `${url}?${key}&${input}`);
}

export function placeDetails(place_id) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json',
    key = `key=${Config.PLACES_API_KEY}`,
    placeid = `placeid=${place_id}`;

  return fetch(`${url}?${key}&${placeid}`);
}

export function gPlaceToPlace(gPlace) {
  return gPlace ? {
    ...gPlace,
    id: gPlace.place_id,
    address: gPlace.vicinity,
    latitude: gPlace.geometry.location.lat,
    longitude: gPlace.geometry.location.lng,
    reviews: [{
      created_by: {
        first_name: gPlace.name,
      },
      short_description: gPlace.types ? gPlace.types.join(', ') : '',
      categories: [],
      pictures: [],
    }],
  } : null;
}
