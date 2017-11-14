import {
  NEARBY,
  FOCUS,
  SEARCH_TYPE
} from '../constants/search';

import { LOGOUT } from '../constants/auth';

const initialState = {
  nearbyPlaces: [],
  nearbyLoading: true,
  focused: false,
  searchType: null
};

function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case NEARBY:
      return {
        ...state,
        nearbyPlaces: action.places ? action.places.results : initialState.nearbyPlaces,
        nearbyLoading: false
      };
    case FOCUS:
      return { ...state, focused: action.focused };
    case SEARCH_TYPE:
      let newState = {
        ...state,
        searchType: action.typeSearch,
      };
      newState[`${action.typeSearch}Loading`] = true;

      return newState;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default SearchReducer;
