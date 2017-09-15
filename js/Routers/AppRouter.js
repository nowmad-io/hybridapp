import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import BlankPage from '../components/blankPage';
import DrawBar from '../components/DrawBar';

const DrawNav = DrawerNavigator(
  {
    Home: { screen: Home },
    BlankPage: { screen: BlankPage },
  },
  {
    contentComponent: props => <DrawBar {...props} />,
  },
);

DrawNav.navigationOptions = ({ navigation }) => ({
  header: null,
});

export default DrawNav;
