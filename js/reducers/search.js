import {
  PEOPLE_SEARCH,
  REVIEWS_SEARCH,
  PLACES_SEARCH,
} from '../constants/search';

import { LOGOUT } from '../constants/auth';

const initialState = {
  reviews: [],
  people: [],
  places: [],
  peopleLoading: false,
  placesLoading: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${PEOPLE_SEARCH}_REQUEST`:
      return {
        ...state,
        peopleLoading: true,
      };
    case `${PEOPLE_SEARCH}_SUCCESS`:
    console.log('PEOPLE_SEARCH', action.payload);
      return {
        ...state,
        peopleLoading: false,
      };
    case `${PLACES_SEARCH}_REQUEST`:
      return {
        ...state,
        placesLoading: true,
      };
    case `${PLACES_SEARCH}_SUCCESS`:
    console.log('PLACES_SEARCH', action);
      return {
        ...state,
        placesLoading: false,
      };
    case REVIEWS_SEARCH:
    console.log('REVIEWS_SEARCH', action);
      return {
        ...state,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default searchReducer;
