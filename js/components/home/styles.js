const React = require('react-native');

const { StyleSheet } = React;

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: "20%",
  },
};
