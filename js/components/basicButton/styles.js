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
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: 34,
    backgroundColor: colors.green,
  },
  text: {
    textAlign: 'center',
    width: '100%'
  }
};
