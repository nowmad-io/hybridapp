import { createSelector } from 'reselect';
import _ from 'lodash';

import {
  PEOPLE_SEARCH,
  REVIEWS_SEARCH,
  PLACES_SEARCH,
} from '../constants/search';
import { ACCEPT_FRIENDSHIP } from '../constants/friends';
import { LOGOUT } from '../constants/auth';

import { getOutgoings, getIncomings } from './friends';

const getPeople = state => state.search.people;

export const selectPeople = () => createSelector(
  [getPeople, getOutgoings, getIncomings],
  (people, outgoings, incomings) => people.map(ppl => ({
    ...ppl,
    outgoing: (ppl.type === 'friends_friends' || ppl.type === 'other') && _.find(
      outgoings,
      ({ to_user: { id } }) => id === ppl.id,
    ),
    incoming: (ppl.type === 'friends_friends' || ppl.type === 'other') && _.find(
      incomings,
      ({ from_user: { id } }) => id === ppl.id,
    ),
  })),
);

const initialState = {
  reviews: [],
  people: [],
  places: [],
  peopleLoading: true,
  placesLoading: true,
  query: '',
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${PEOPLE_SEARCH}_API_CALL`:
      return {
        ...state,
        peopleLoading: true,
      };
    case `${PEOPLE_SEARCH}_SUCCESS`:
      return {
        ...state,
        peopleLoading: false,
        people: action.payload,
      };
    case `${ACCEPT_FRIENDSHIP}_SUCCESS`:
      return {
        ...state,
        people: state.people.map(ppl => (
          (ppl.id === action.payload.id)
            ? action.payload
            : ppl
        )),
      };
    case `${PLACES_SEARCH}_API_CALL`:
      return {
        ...state,
        placesLoading: true,
      };
    case `${PLACES_SEARCH}_SUCCESS`:
      return {
        ...state,
        placesLoading: false,
        places: action.payload,
      };
    case `${PEOPLE_SEARCH}_ERROR`:
    case `${PLACES_SEARCH}_ERROR`:
      return {
        ...state,
        peopleLoading: false,
        placesLoading: false,
      };
    case REVIEWS_SEARCH:
      return {
        ...state,
        query: action.query,
      };
    case `${LOGOUT}_REQUEST`:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
