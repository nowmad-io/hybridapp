import React from 'react-native';

import { colors } from '../../parameters';
const { StyleSheet } = React;

export default {
  buttonWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
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
