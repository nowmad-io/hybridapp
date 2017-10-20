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
    paddingRight: itemHorizontalMargin + 2,
    paddingLeft: itemHorizontalMargin,
    margin: 0
  }),
  card: {
    height: '100%',
    width: '100%',
    flex: 0
  },
  thumbnail: {
    alignSelf: 'flex-start'
  },
  addressIcon: {
    fontSize: 12,
    marginRight: 10,
    color: colors.grey
  },
  address: {
    paddingTop: 4,
    fontSize: 10,
    color: colors.grey,
  },
  thumbnailFriends: (index) => ({
    position: 'absolute',
    top: 0,
    right: index * 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.white,
    zIndex: 100 - index
  })
};

export default {
  carouselWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  carousel: {
    ...StyleSheet.absoluteFillObject,
  },
}
