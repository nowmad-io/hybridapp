import {StyleSheet, Dimensions, Platform} from 'react-native';

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
