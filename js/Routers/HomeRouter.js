import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import Home from '../components/pages/home';
import DrawBar from '../components/pages/drawBar';

import { sizes } from '../parameters';

export default createDrawerNavigator(
  {
    Home,
    DrawBar,
  },
  {
    drawerPosition: 'right',
    contentComponent: props => <DrawBar {...props} />,
    drawerWidth: sizes.drawerWidth,
    navigationOptions: {
      header: null,
    },
  },
);
