import React, { StatusBar, Dimensions } from 'react-native';

import material from '../native-base-theme/variables/material';

export const font = {
  fontFamily: 'Roboto',
  fontWeight: {
    thin: '100',
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
    black: '900'
  },
  fontSize: {
    text: 16
  },
  fontStyle: {
    normal: 'normal',
    italic: 'italic'
  }
}

export const colors = {
  green: '#00C69F',
  greenShadow: 'rgba(0, 198, 159, 0.3)',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#BCB9B9',
  greyDark: '#5E5D5D',
  red: '#FF4A40',
  blue: '#0076FF',
  blueDark: '#101172',
  blackShadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4
  },
  greyTransparent: 'rgba(188, 185, 185, 0.2)',
  whiteTransparent: 'rgba(255, 255, 255, 0.6)',
  whiteTransparentLight: 'rgba(255, 255, 255, 0.8)',
  transparent: 'rgba(0, 0, 0, 0)'
};

export const sizes = {
  toolbarHeight: material.toolbarHeight,
  statusBar: StatusBar.currentHeight,
  ITEM_LEVEL1: 80,
  ITEM_LEVEL2: 232,
  screen: Dimensions.get('window'),
  drawerWidth: 0.625 * Dimensions.get('window').width
}
