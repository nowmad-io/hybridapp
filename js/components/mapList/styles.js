import { StyleSheet, Platform, StatusBar } from 'react-native';

import { colors, sizes } from '../../parameters';

export const screen = {
  height: sizes.height,
  width: sizes.width
}

export const SCREEN_PADDING_TOP = 12;
const ITEM_SPACING = 8;
const ITEM_PREVIEW = 8;
const ITEM_BORDER = 4;
const ITEM_WIDTH = screen.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
export const ITEM_LEVEL1 = sizes.ITEM_LEVEL1;
export const ITEM_LEVEL2 = sizes.ITEM_LEVEL2;
export const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
export const ITEM_PREVIEW_HEIGHT = ITEM_LEVEL1 - sizes.statusBar - ITEM_BORDER;
const BREAKPOINT_HELPER = sizes.statusBar + sizes.toolbarHeight + ITEM_BORDER + SCREEN_PADDING_TOP
export const BREAKPOINT1 = (screen.height - ITEM_LEVEL1 - BREAKPOINT_HELPER);
export const BREAKPOINT2 = (ITEM_LEVEL2 - ITEM_LEVEL1);
export const TOOLBARHEIGHT = sizes.toolbarHeight;
export const STATUSBARHEIGHT = sizes.statusBar;

export const entryStyles = {
  card: (selected = true, level = 0) => ({
    position: 'relative',
    minHeight: screen.height - 40,
    height: '100%',
    width: '100%',
    flex: 0,
    borderRadius: 0,
    borderTopWidth: selected && level < 2 ? 4 : 0,
    paddingTop: selected || level === 2 ? 0 : 4,
    borderColor: colors.green,
    paddingBottom: 50
  }),
  showcase: {
    marginBottom: 50,
    zIndex: 1
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
    marginTop: screen.height - ITEM_PREVIEW_HEIGHT - sizes.toolbarHeight
  },
  item: {
    width: ITEM_WIDTH,
    height: BREAKPOINT1 + ITEM_LEVEL1 + ITEM_BORDER,
    marginHorizontal: ITEM_SPACING / 2,
  }
}
