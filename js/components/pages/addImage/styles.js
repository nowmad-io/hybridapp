import React, { StyleSheet } from 'react-native';

import { colors } from '../../../parameters';

export default {
  content: {
    backgroundColor: colors.white,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    marginTop: 14,
  },
  image: {
    height: 400,
    width: '100%',
  },
  actionsWrapper: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconHeader: {
    color: colors.white,
  },
  icon: {
    color: colors.grey,
  },
};
