import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

import { colors } from '../../parameters';

export const screen = Dimensions.get('window');

const ITEM_SPACING = 8;
const ITEM_PREVIEW = 8;
const ITEM_WIDTH = screen.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
export const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
export const ITEM_PREVIEW_HEIGHT = 80 - StatusBar.currentHeight - 4;
export const BREAKPOINT1 = screen.height;

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
    paddingTop: selected || level === 2 ? 0 : 4,
    borderColor: colors.green,
    paddingBottom: level > 1 ? 50 : 0
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
  }
};

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  itemContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: (ITEM_SPACING / 2) + ITEM_PREVIEW,
    position: 'absolute',
    marginTop: screen.height - ITEM_PREVIEW_HEIGHT - 56
  },
  item: {
    width: ITEM_WIDTH,
    height: screen.height + (2 * ITEM_PREVIEW_HEIGHT),
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000',
  },
  wishListIcon: {
    flex: 1,
    fontSize: 24,
    color: colors.green,
  }
}
