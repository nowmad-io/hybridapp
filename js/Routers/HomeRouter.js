import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import Friends from '../components/friends';
import DrawBar from '../components/drawBar';

const HomeRouter = DrawerNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
  DrawBar: { screen: DrawBar }
},
{
  contentComponent: props => <DrawBar {...props} />
});

HomeRouter.navigationOptions = () => ({
  header: null,
});

export default HomeRouter;
