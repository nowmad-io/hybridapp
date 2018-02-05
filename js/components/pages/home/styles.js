import React, { StyleSheet, Dimensions } from 'react-native';

import { colors, sizes } from '../../../parameters';

const SLIDER_WIDTH = sizes.width;
const ITEM_SPACING = 8;
const ITEM_WIDTH = sizes.width - ITEM_SPACING * 2;

const HELPER = sizes.toolbarHeight + sizes.headerHeight + sizes.statusBar;
const PADDING_TOP = 16;
const BORDER = 4;
const LEVEL1 = - 80 - BORDER;
const LEVEL2 = - 232 - BORDER;
const LEVEL3 = LEVEL1 + HELPER + PADDING_TOP - sizes.height + BORDER;

export { sizes, ITEM_WIDTH, SLIDER_WIDTH }

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  carousel: {
    position: 'absolute',
    top: sizes.height - 80
  },
  entryWrapper: {
    paddingHorizontal: ITEM_SPACING / 2,
    width: ITEM_WIDTH
  },
  entry: {
    width: ITEM_WIDTH - ITEM_SPACING
  }
};
