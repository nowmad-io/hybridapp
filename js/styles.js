const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
  },
};
