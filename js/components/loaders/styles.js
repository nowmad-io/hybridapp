import React, { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export { colors };

export default {
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.whiteTransparentLight,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
