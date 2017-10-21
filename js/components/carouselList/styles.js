import {StyleSheet, Dimensions, Platform} from 'react-native';

import { colors } from '../../parameters';

export const dimension = {
  width: viewportWidth,
  height: viewportHeight
} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(92);
const itemHorizontalMargin = 3;

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export const entryStyles = {
  slideInnerContainer: (index) => ({
    width: itemWidth,
    height: '100%',
    paddingRight: itemHorizontalMargin + 2,
    paddingLeft: itemHorizontalMargin,
    margin: 0,
  }),
  card: (selected = true, level = 0) => ({
    position: 'relative',
    minHeight: viewportHeight - 40,
    height: '100%',
    width: '100%',
    flex: 0,
    borderRadius: 0,
    borderTopWidth: selected && level < 2 ? 4 : 0,
    paddingTop: selected ? 0 : 4,
    borderColor: colors.green,
    paddingBottom: level > 2 ? 50 : 0
  }),
  addressWrapper: {
    borderColor: colors.green,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 1,
    paddingBottom: 4
  },
  address: {
    paddingTop: 4,
    fontSize: 12,
    alignSelf: 'center',
    color: colors.grey,
  },
  addressIcon: {
    fontSize: 10,
    color: colors.grey
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 3,
    right: 5,
    paddingTop: 8,
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 8,
    borderRadius: 0
  },
  button: {
    height: 34,
    width: '100%',
    backgroundColor: colors.green,
  }
};

export default {
  carouselWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  carousel: {
    ...StyleSheet.absoluteFillObject,
  },
}
