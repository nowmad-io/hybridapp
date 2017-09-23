import {
  CREATE_SUCCESS,
  DELETE_SUCCESS
} from 'redux-crud-store/lib/actionTypes';

import {
  SEARCH_RESULTS,
  BOUNDS_CHANGES,
  MARKER_SELECTED,
  SEARCH_SELECTED,
  UNSELECT,
  MODEL
} from '../constants/reviews';

const initialState = {
  mapConfig: {
    zoom: 2,
    center: {
      lat: 18.4560324,
      lng: 7.9661914,
    },
    bounds: null
  },
  searchMarkers: [],
  selectedMarker: null
};

function reviewsPageReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_RESULTS:
      return {
        ...state,
        searchMarkers: action.data,
        mapConfig: {
          ...state.mapConfig,
          center: action.center
        }
      };
    case BOUNDS_CHANGES:
      return {
        ...state,
        mapConfig: {
          ...state.mapConfig,
          bounds: action.bounds,
          center: action.center
        }
      };
    case MARKER_SELECTED:
      return {
        ...state,
        selectedMarker: action.marker.data,
        selectedSearch: null
      };
    case SEARCH_SELECTED:
      return {
        ...state,
        selectedMarker: null,
        selectedSearch: action.search
      };
    case DELETE_SUCCESS:
    case UNSELECT:
      if (action.meta && action.meta.model && action.meta.model !== MODEL) {
        return state;
      }
      return {
        ...state,
        selectedMarker: null,
        selectedSearch: null
      };
    case CREATE_SUCCESS:
      if (action.meta.model === MODEL) {
        return {
          ...state,
          selectedMarker: action.payload,
          selectedSearch: null,
          searchMarkers: []
        };
      }
      return state
    default:
      return state;
  }
}

export default reviewsPageReducer;
