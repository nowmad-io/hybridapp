import React from 'react-native';

import { colors } from '../../parameters';
const { StyleSheet } = React;

export default {
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 3,
    right: 5,
    paddingTop: 8,
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 8,
    borderRadius: 0,
    backgroundColor: colors.white
  },
  button: {
    height: 34,
    width: '100%',
    backgroundColor: colors.green,
  }
};
