import { StackNavigator } from 'react-navigation';

import HomeRouter from './HomeRouter';

import AddReview from '../components/pages/addReview';
import ReviewDetail from '../components/pages/reviewDetail';
import AddImage from '../components/pages/addImage';
import AddFriend from '../components/pages/addFriend';
import PlaceDetails from '../components/pages/placeDetails';

const AppRouter = StackNavigator({
  Home: HomeRouter,
  AddReview,
  ReviewDetail,
  AddImage,
  AddFriend,
  PlaceDetails,
}, {
  navigationOptions: {
    header: null,
  },
});

export default AppRouter;
