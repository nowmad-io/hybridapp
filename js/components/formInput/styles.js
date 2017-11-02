import React,  { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export default {
  inputWrapper: {
    marginTop: 6,
    paddingBottom: 6,
  },
  input: {
    fontSize: 14,
    lineHeight: 14,
    paddingTop: 0,
    paddingBottom: 10
  },
  length: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    fontSize: 10,
    fontWeight: '500',
    color: colors.greyDark
  }
};
