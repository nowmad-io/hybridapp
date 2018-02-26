import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

import HomeRouter from './HomeRouter';

import AddReview from '../components/pages/addReview';
import ReviewDetail from '../components/pages/reviewDetail';
import AddImage from '../components/pages/addImage';
import AddFriend from '../components/pages/addFriend';

const AppRouter = StackNavigator({
  Home: { screen: HomeRouter },
  AddReview: { screen: AddReview },
  ReviewDetail: { screen: ReviewDetail },
  AddImage: { screen: AddImage },
  AddFriend: { screen: AddFriend }
}, {
  navigationOptions: {
    header: null,
  }
});

export default AppRouter;
