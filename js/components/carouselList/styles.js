import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.2;
const slideWidth = wp(90);
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth;

const entryBorderRadius = 8;

export const entryStyles = {
  slideInnerContainer: {
    width: itemWidth,
    paddingHorizontal: itemHorizontalMargin
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios'
      ? entryBorderRadius
      : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on ios; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: colors.black
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  titleEven: {
    color: 'white'
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic'
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  }
};

export default {
  carouselWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  carousel: {
    ...StyleSheet.absoluteFillObject,
  },
}
