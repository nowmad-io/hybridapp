import React, { Platform, StatusBar, Dimensions, PixelRatio } from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const isIphoneX = Platform.OS === "ios" && deviceHeight === 812 && deviceWidth === 375;

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
    text: 16,
    icon: 28
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
  transparent: 'rgba(0, 0, 0, 0)',
  ripple: 'rgba(256, 256, 256, 0.3)',
  rippleDark: 'rgba(0, 0, 0, 0.15)'
};

export const sizes = {
  height: Platform.OS === "ios" ? deviceHeight : deviceHeight - StatusBar.currentHeight,
  width: deviceWidth,
  headerHeight: 56,
  ITEM_LEVEL1: 80,
  ITEM_LEVEL2: 232,
  toolbarHeight: Platform.OS === "ios" ? (isIphoneX ? 88 : 64) : 56,
  statusBar: StatusBar.currentHeight,
  drawerWidth: 0.625 * Dimensions.get('window').width
}
