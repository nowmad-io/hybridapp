import React, { Dimensions } from 'react-native';

import { colors } from '../../parameters';

export { colors };

const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    backgroundColor: colors.white,
  },
  content: {
    backgroundColor: colors.green,
  },
  logoWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '51%'
  },
  logoWrapperRegister: {
    height: '30%'
  },
  logo: {
    height: 200,
    width: '100%',
  },
  itemsWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  inputItem: {
    marginBottom: 20,
  },
  inputIcon: {
    color: colors.white,
  },
  input: {
    color: colors.white,
  },
  button: {
    width: '100%',
    marginTop: 20
  }
};
