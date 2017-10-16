import { GEOLOCATION } from '../constants/map';

const initialState = {
  position: null
};

function mapReducer(state = initialState, action) {
  switch (action.type) {
    case GEOLOCATION:
      console.log('geolocation', action.position)
      return { ...state, position: action.position}
    default:
      return state;
  }
}

export default mapReducer;
