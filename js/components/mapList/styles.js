import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

import { colors } from '../../parameters';
import material from '../../../native-base-theme/variables/material';

export const screen = Dimensions.get('window');

const SCREEN_PADDING_TOP = 12;
const ITEM_SPACING = 8;
const ITEM_PREVIEW = 8;
const ITEM_BORDER = 4;
const ITEM_WIDTH = screen.width - (2 * ITEM_SPACING) - (2 * ITEM_PREVIEW);
const ITEM_LEVEL1 = 80;
export const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
export const ITEM_PREVIEW_HEIGHT = ITEM_LEVEL1 - StatusBar.currentHeight - ITEM_BORDER;
export const BREAKPOINT1 = (screen.height - StatusBar.currentHeight - ITEM_LEVEL1 - material.toolbarHeight - ITEM_BORDER - SCREEN_PADDING_TOP);

export const entryStyles = {
  card: (selected = true, level = 0) => ({
    minHeight: screen.height - 40,
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
    marginTop: screen.height - ITEM_PREVIEW_HEIGHT - material.toolbarHeight
  },
  item: {
    width: ITEM_WIDTH,
    height: BREAKPOINT1 + ITEM_LEVEL1 + ITEM_BORDER,
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
