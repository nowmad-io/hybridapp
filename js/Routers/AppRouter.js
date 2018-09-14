import { createStackNavigator } from 'react-navigation';

import HomeRouter from './HomeRouter';

import AddReview from '../components/pages/addReview';
import ReviewDetails from '../components/pages/reviewDetails';
import AddImage from '../components/pages/addImage';
import AddFriend from '../components/pages/addFriend';
import PlaceDetails from '../components/pages/placeDetails';
import EditProfile from '../components/pages/editProfile';

export default createStackNavigator({
  Home: HomeRouter,
  AddReview,
  ReviewDetails,
  AddImage,
  AddFriend,
  PlaceDetails,
  EditProfile,
}, {
  navigationOptions: {
    header: null,
  },
});
