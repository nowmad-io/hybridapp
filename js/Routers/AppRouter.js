import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation';

import HomeRouter from './HomeRouter';

import AddReview from '../components/addReview';
import AddImage from '../components/addImage';
import AddFriend from '../components/addFriend';

const AppRouter = StackNavigator({
  Home: { screen: HomeRouter },
  AddReview: { screen: AddReview },
  AddImage: { screen: AddImage },
  AddFriend: { screen: AddFriend }
}, {
  navigationOptions: {
    header: null,
  }
});

export default AppRouter;
