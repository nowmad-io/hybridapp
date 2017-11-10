import React, { StyleSheet } from 'react-native';

import material from '../../../native-base-theme/variables/material';
import { colors } from '../../parameters';

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    zIndex: 999999999,
  },
  headerView: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerInput: {
    flex: 1
  },
  headerButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  headerIcon: {
    marginHorizontal: 8,
    color: colors.white
  },
  menuIcon: {
    alignSelf: 'flex-end'
  },
  resultList: {
    position: 'absolute',
    top: material.toolbarHeight,
    bottom: 0,
    right: 0,
    left: 0
  }
};
