const React = require('react-native');

const { StyleSheet } = React;

import { colors } from '../../parameters';

export default {
  wrapper: {
    width: 36,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    backgroundColor: colors.greenShadow,
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailWrapper: {
    backgroundColor: colors.white,
    borderRadius: 18,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 6,
    borderRightWidth: 6/2.0,
    borderBottomWidth: 0,
    borderLeftWidth: 6/2.0,
    borderTopColor: 'white',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    'zIndex': 2
  }
};
