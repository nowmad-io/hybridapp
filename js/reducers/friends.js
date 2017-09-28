import {
  SEARCH_FRIENDS_SUCCESS,
} from '../constants/friends';

const initialState = {
  search: [],
  error: ''
};

function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FRIENDS_SUCCESS:
      console.log('SEARCH_FRIENDS_SUCCESS action', action);
      return state
    default:
      return state;
  }
}

export default friendsReducer;
