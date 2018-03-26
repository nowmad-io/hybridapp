import Config from 'react-native-config';

import { apiCall } from '../requests';

import {
  NEARBY_SUCCESS,
  NEARBY_ERROR,
  PLACES_SEARCH,
  PLACES_SEARCH_ERROR,
} from '../constants/search';

export function getNearbyPlaces(place) {
  const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const key = `key=${Config.PLACES_API_KEY}`;
  const location = `location=${place.latitude},${place.longitude}`;
  const radius = 'radius=500';

  return apiCall(NEARBY_SUCCESS, NEARBY_ERROR, 'get', `${url}?${key}&${location}&${radius}`);
}

export function placesSearch(query) {
  const url = 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json';
  const key = `key=${Config.PLACES_API_KEY}`;
  const input = `input=${query}`;

  return apiCall(PLACES_SEARCH, PLACES_SEARCH_ERROR, 'get', `${url}?${key}&${input}`);
}

export function placeDetails(placeId) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json';
  const key = `key=${Config.PLACES_API_KEY}`;
  const placeid = `placeid=${placeId}`;

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
