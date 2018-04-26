import Config from 'react-native-config';

import { apiGet } from '../requests';

import {
  REVIEWS_SEARCH,
  PLACES_SEARCH,
  PEOPLE_SEARCH,
} from '../constants/search';

const COORD_REGEX = /^([-+]?[\d]{1,2}\.\d+),\s*([-+]?[\d]{1,3}\.\d+)?$/;

function peopleParser(people) {
  if (!people) {
    return [];
  }

  return [
    ...people.friends,
    ...people.friends_friends.map(friend => ({
      ...friend,
      type: 'friends_friends',
    })),
    ...people.others.map(other => ({
      ...other,
      type: 'other',
    })),
  ];
}

export function reviewsSearch(query) {
  return {
    type: REVIEWS_SEARCH,
    query,
  };
}

export function peopleSearch(query) {
  return apiGet(PEOPLE_SEARCH, 'friends/search/', { query }, null, peopleParser);
}

export function placesSearch(query) {
  const key = `key=${Config.PLACES_API_KEY}`;
  const coord = COORD_REGEX.exec(query);
  let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  let params = `input=${query}`;

  if (coord && coord.length >= 3) {
    const location = `location=${coord[1]},${coord[2]}`;
    const radius = 'radius=500';

    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    params = `${location}&${radius}`;
  }

  return apiGet(PLACES_SEARCH, `${url}?${key}&${params}`);
}

export function placeDetails(placeId) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json';
  const key = `key=${Config.PLACES_API_KEY}`;
  const placeid = `placeid=${placeId}`;

  return fetch(`${url}?${key}&${placeid}`);
}

function gPlaceToPlace(gPlace) {
  return gPlace ? {
    ...gPlace,
    id: gPlace.place_id,
    address: gPlace.formatted_address || gPlace.vicinity,
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
