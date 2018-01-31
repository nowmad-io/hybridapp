import React, { StyleSheet } from 'react-native';

import { colors } from '../../../parameters';

export default {
  content: {
    backgroundColor: colors.white,
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  profileWrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginBottom: 16
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 16
  },
  title: {
    fontSize: 24
  },
  subtitle: {
    fontSize: 16
  },
  requestButton: {
    alignSelf: 'flex-end',
    height: 32,
    marginTop: 16
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
};
