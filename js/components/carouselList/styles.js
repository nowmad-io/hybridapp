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
    margin: 0,
  }),
  card: (selected = true) => ({
    height: '100%',
    width: '100%',
    flex: 0,
    borderRadius: 0,
    borderTopWidth: selected ? 4 : 0,
    paddingTop: selected ? 0 : 4,
    borderColor: colors.green
  }),
  infoWrapper: {
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 12,
    paddingBottom: 8,
  },
  thumbnail: {
    alignSelf: 'flex-start'
  },
  addressIcon: {
    fontSize: 10,
    color: colors.grey
  },
  address: {
    paddingTop: 4,
    fontSize: 12,
    color: colors.grey,
  },
  picturesWrapper: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  wrapperLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  wrapperRight: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  mainPicture: (showcase = false) => ({
    height: 102,
    width: '100%',
    flex: 1,
    marginRight: showcase ? 1 : 0
  }),
  pictures: (length = 1, first = true) => ({
    width: '100%',
    width: '100%',
    flex: 1,
    marginLeft: length > 1 ? 1 : 0,
    marginBottom: length > 2 && first ? 1 : 0,
    marginTop: length > 2 && !first ? 1 : 0,
  }),
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
