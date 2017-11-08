import React, { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export default {
  searchWrapper: {
    alignItems: "center",
    flexDirection: "row",
  },
  searchInput: {
    display: 'flex',
    flexDirection: "row",
    flex: 1,
    fontSize: 16,
    lineHeight: 16,
    color: colors.white
  },
  inputButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputIcon: {
    marginHorizontal: 8,
    color: colors.white
  },
};
