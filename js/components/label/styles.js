import React, { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export default {
  LabelWrapper: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 16
  },
  label: {
    fontSize: 16,
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
