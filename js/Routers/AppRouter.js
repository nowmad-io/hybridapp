import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Home from '../components/home/';
import BlankPage from '../components/blankPage';
import DrawBar from '../components/drawBar';

const AppRouter = DrawerNavigator({
  Home: { screen: Home },
  BlankPage: { screen: BlankPage },
},
{
  contentComponent: props => <DrawBar {...props} />,
});

AppRouter.navigationOptions = () => ({
  header: null,
});

export default AppRouter;
