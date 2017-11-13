import React, { StyleSheet } from 'react-native';

import { colors } from '../../parameters';

export default {
  resultWrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  labelCluster: {
    color: colors.grey,
    fontSize: 16,
    lineHeight: 18
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageItem: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  textWrapperItem: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: colors.grey
  },
  button: {
    marginTop: 28,
    alignSelf: 'flex-end'
  },
  spinner: {
    marginTop: 28,
  }
};
