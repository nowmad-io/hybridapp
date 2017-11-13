import React, { Dimensions } from 'react-native';

import { colors } from '../../parameters';

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
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.green
  }
};
