import React from 'react-native';

import { colors } from '../../parameters';
const { StyleSheet } = React;

export default {
  wrapper: (empty, selected) => {
    let extras = {};

    if (empty || selected) {
      extras = {
        borderColor: colors.green,
        borderWidth: selected ? 2 : 1
      }
    }

    return {
      height: 58,
      width: 58,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...extras
    }
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
