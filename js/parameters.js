import { Platform, StatusBar, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const isIphoneX = Platform.OS === 'ios' && deviceHeight === 812 && deviceWidth === 375;

export const font = {
  fontFamily: 'Roboto',
  fontWeight: {
    thin: '100',
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
    black: '900',
  },
  fontStyle: {
    normal: 'normal',
    italic: 'italic',
  },
};

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
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  greyTransparent: 'rgba(188, 185, 185, 0.2)',
  whiteTransparent: 'rgba(255, 255, 255, 0.6)',
  whiteTransparentLight: 'rgba(255, 255, 255, 0.8)',
  transparent: 'rgba(0, 0, 0, 0)',
  ripple: 'rgba(256, 256, 256, 0.3)',
  rippleDark: 'rgba(0, 0, 0, 0.15)',
};

const toolbarHelper = (isIphoneX ? 88 : 64);
export const sizes = {
  height: Platform.OS === 'ios' ? deviceHeight : deviceHeight - StatusBar.currentHeight,
  width: deviceWidth,
  headerHeight: 56,
  toolbarHeight: Platform.OS === 'ios' ? toolbarHelper : 56,
  statusBar: StatusBar.currentHeight,
  drawerWidth: 0.625 * Dimensions.get('window').width,
};

const HELPER = sizes.headerHeight;
const PADDING_TOP = 16;
const ITEM_SPACING = 8;
const LEVEL1 = 80;

export const carousel = {
  sliderWidth: sizes.width,
  itemSpacing: ITEM_SPACING,
  itemWidth: sizes.width - (ITEM_SPACING * 2),
  level1: LEVEL1,
  level2: 230,
  level3: sizes.height - HELPER - PADDING_TOP,
  border: 4,
};
