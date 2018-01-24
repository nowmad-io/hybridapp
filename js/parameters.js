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
  height: Platform.OS === "ios" ? deviceHeight : deviceHeight - 20,
  width: deviceWidth,
  header: {
    height: Platform.OS === "ios" ? (isIphoneX ? 88 : 64) : 56,
    paddingTop: Platform.OS === "ios" ? (isIphoneX ? 39 : 15) : 0,
    borderBottomWidth: Platform.OS === "ios" ? 1 / PixelRatio.getPixelSizeForLayoutSize(1) : 0
  },
  toolbarHeight: Platform.OS === "ios" ? (isIphoneX ? 88 : 64) : 56,
  statusBar: StatusBar.currentHeight,
  ITEM_LEVEL1: 80,
  ITEM_LEVEL2: 232,
  drawerWidth: 0.625 * Dimensions.get('window').width
}
