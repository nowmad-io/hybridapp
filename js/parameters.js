import { Platform, StatusBar, Dimensions } from 'react-native';
import hexRgb from 'hex-rgb';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const isIphoneX = Platform.OS === 'ios' && deviceHeight === 812 && deviceWidth === 375;

function rgba(hex, a = null) {
  const {
    red, green, blue, alpha,
  } = hexRgb(hex);
  return `rgba(${red}, ${green}, ${blue}, ${a !== null ? a : alpha})`;
}

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

const plain = {
  lightGreen: '#C4D6D1',
  green: '#1DA07F',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#BCB9B9',
  greyDark: '#5E5D5D',
  red: '#FF4A40',
  blue: '#0076FF',
  blueDark: '#101172',
  yellow: '#FFC546',
};

export const colors = {
  ...plain,
  greenShadow: rgba(plain.green, 0.4),
  greenShadowDark: rgba(plain.green, 0.8),
  blackShadow: {
    elevation: 2,
    shadowColor: plain.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  greyTransparent: rgba(plain.grey, 0.2),
  greyButton: rgba(plain.black, 0.6),
  whiteTransparent: rgba(plain.white, 0.6),
  whiteTransparentLight: rgba(plain.white, 0.8),
  transparent: rgba(plain.black, 0),
  yellowTransparent: rgba(plain.yellow, 0.95),
};

const toolbarHelper = (isIphoneX ? 88 : 64);
export const sizes = {
  height: Platform.OS === 'ios' ? deviceHeight : deviceHeight - StatusBar.currentHeight,
  width: deviceWidth,
  headerHeight: 56,
  toolbarHeight: Platform.OS === 'ios' ? toolbarHelper : 56,
  statusBar: StatusBar.currentHeight,
  drawerWidth: 304,
  filters: 142,
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
  level2: 164,
  level3: sizes.height - HELPER - PADDING_TOP,
  border: 4,
};
