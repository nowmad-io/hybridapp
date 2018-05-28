import Config from 'react-native-config';
import shortid from 'shortid';

import { apiGet } from '../requests';

import {
  REVIEWS_SEARCH,
  PLACES_SEARCH,
  PEOPLE_SEARCH,
} from '../constants/search';

const COORD_REGEX = /^([-+]?[\d]{1,2}\.\d+),\s*([-+]?[\d]{1,3}\.\d+)?$/;

const gPlaceToPlace = gPlace => ({
  ...gPlace,
  address: gPlace.formatted_address,
  latitude: gPlace.geometry.location.lat,
  longitude: gPlace.geometry.location.lng,
  reviews: [{
    google: true,
    created_by: {
      first_name: gPlace.name,
    },
    categories: [],
    pictures: gPlace.photos,
  }],
});

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

function autocompleteToPlace(autocomplete) {
  if (!autocomplete) {
    return [];
  }

  return [
    ...autocomplete.predictions.map(prediction => ({
      ...prediction,
      id: shortid.generate(),
      name: prediction.description,
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
  const parser = autocompleteToPlace;

  if (coord && coord.length >= 3) {
    const location = `location=${coord[1]},${coord[2]}`;
    const radius = 'radius=500';

    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    params = `${location}&${radius}`;
  }

  return apiGet(PLACES_SEARCH, `${url}?${key}&${params}`, {}, null, parser);
}

export function photoUrl(ref) {
  const url = 'https://maps.googleapis.com/maps/api/place/photo';
  const key = `key=${Config.PLACES_API_KEY}`;
  const maxwidth = 'maxwidth=600';
  const photoreference = `photoreference=${ref}`;

  return `${url}?${key}&${maxwidth}&${photoreference}`;
}

export function placeDetails(placeId) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json';
  const key = `key=${Config.PLACES_API_KEY}`;
  const placeid = `placeid=${placeId}`;

  return fetch(`${url}?${key}&${placeid}`)
    .then(response => response.json())
    .then(({ result: { photos, ...gPlace } }) => ({
      ...gPlace,
      photos: photos.slice(0, 2).map(({ photo_reference: ref }) => ({
        source: photoUrl(ref),
      })),
    }))
    .then(gPlace => gPlaceToPlace(gPlace));
}
