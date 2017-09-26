import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import Friends from '../components/friends';
import DrawBar from '../components/drawBar';

const AppRouter = DrawerNavigator({
  Home: { screen: Home },
  Friends: { screen: Friends },
},
{
  contentComponent: props => <DrawBar {...props} />,
});

AppRouter.navigationOptions = () => ({
  header: null,
});

export default AppRouter;
