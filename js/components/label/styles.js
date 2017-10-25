import React, { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export default {
  LabelWrapper: {
    marginTop: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: '500',
  },
  requiredWrapper: {
    height: '100%',
    marginLeft: 2
  },
  required: {
    position: 'absolute',
    top: 4,
    height: 4,
    width: 4,
    backgroundColor: colors.red,
    borderRadius: 100
  }
};
