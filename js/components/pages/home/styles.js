import React, { StyleSheet } from 'react-native';

import { sizes } from '../../../parameters';

const HELPER = sizes.toolbarHeight + sizes.headerHeight + sizes.statusBar;
const PADDING_TOP = 16;
const LEVEL1 = - 80;
const LEVEL2 = 80 - 232;
const LEVEL3 = HELPER + PADDING_TOP - sizes.height;

export { sizes, LEVEL1, LEVEL2, LEVEL3 }

export default {};
