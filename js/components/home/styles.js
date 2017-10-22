import React from 'react-native';

const { StyleSheet } = React;

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
    zIndex: 999999999
  }
};
