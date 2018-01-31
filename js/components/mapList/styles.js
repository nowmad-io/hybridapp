import { StyleSheet, Platform, StatusBar } from 'react-native';

import { colors, sizes } from '../../parameters';

const HELPER = sizes.toolbarHeight + sizes.headerHeight + sizes.statusBar;

// Variables for X scroll
const ITEM_SPACING = 8;
const ITEM_PREVIEW = 8;
const ITEM_WIDTH = sizes.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;

// Variables for Y scroll
const PADDING_TOP = 16;
const BORDER = 4;
const LEVEL1 = - 80 - BORDER;
const LEVEL2 = - 232 - BORDER;
const LEVEL3 = LEVEL1 + HELPER + PADDING_TOP - sizes.height + BORDER;

export {
  SNAP_WIDTH,
  LEVEL1,
  LEVEL2,
  LEVEL3
};

export const entryStyles = {
  card: {
    backgroundColor: colors.white,
    position: 'relative',
    minHeight: sizes.height,
    paddingBottom: sizes.toolbarHeight,
    borderColor: colors.green,
    borderTopWidth: BORDER
  },
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
    top: sizes.height
  },
  item: {
    width: ITEM_WIDTH,
    height: '100%',
    marginHorizontal: ITEM_SPACING / 2,
  }
}
