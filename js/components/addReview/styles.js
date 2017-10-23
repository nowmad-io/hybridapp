import React from 'react-native';

import { colors } from '../../parameters';
const { StyleSheet } = React;

export default {
  mapWrapper: {
    height: 150,
  },
  content: {
    backgroundColor: colors.white
  },
  reviewWrapper: {
    paddingTop: 22,
    paddingHorizontal: 16,
    paddingBottom: 50
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
};
