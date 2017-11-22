import React, { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export default {
  labelWrapper: (subtitle = false) => ({
    marginTop: subtitle ? 8 : 16,
    alignItems: "center",
    flexDirection: "row",
  }),
  label: (subtitle = false) => ({
    fontSize: subtitle ? 10 : 16,
    lineHeight: subtitle ? 12 : 20,
    fontWeight: '500',
    color: subtitle ? colors.greyDark : colors.black
  }),
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
