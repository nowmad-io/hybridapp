import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import BlankPage from '../components/blankPage';
import DrawBar from '../components/drawBar';

const DrawNav = DrawerNavigator(
  {
    Home: { screen: Home },
    BlankPage: { screen: BlankPage },
  },
  {
    contentComponent: props => <DrawBar {...props} />,
  },
);

DrawNav.navigationOptions = () => ({
  header: null,
});

export default DrawNav;
