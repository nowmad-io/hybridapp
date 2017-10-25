import React, { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export default {
  mapWrapper: {
    height: 150,
  },
  content: {
    backgroundColor: colors.white
  },
  reviewWrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 50
  },
  title: {
    fontSize: 24
  },
  tagWrapper: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center'
  }
};
