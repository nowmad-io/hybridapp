import React from 'react-native';

import { colors } from '../../parameters';
const { StyleSheet } = React;

export default {
  wrapper: {
    height: 58,
    width: 58,
    borderWidth: 1,
    borderColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  icon: {
    fontSize: 24,
    color: colors.green
  }
};
