import React, { StyleSheet } from 'react-native';

import { colors, sizes } from '../../parameters';

export default {
  resultWrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: colors.white
  },
  resultView: {
    paddingBottom: sizes.toolbarHeight + 24,
  },
  labelCluster: {
    paddingTop: 24,
    color: colors.grey,
    fontSize: 16,
    lineHeight: 18,
  },
  itemWrapper: (other) => ({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    opacity: other ? 0.5 : 1
  }),
  imageItem: {
    height: 24,
    width: 24,
    marginRight: 10
  },
  thumbnail: {
    borderRadius: 50
  },
  textWrapperItem: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: colors.grey
  },
  secondaryTextItem: {
    color: colors.grey
  },
  button: {
    marginTop: 28,
    alignSelf: 'flex-end'
  },
  spinner: {
  }
};
