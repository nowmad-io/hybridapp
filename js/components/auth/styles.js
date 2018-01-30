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
  item: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: colors.white
  },
  inputIcon: {
    color: colors.white,
  },
  input: {
    color: colors.white,
    marginLeft: 12,
    fontSize: 16,
    flex: 1
  },
  button: {
    width: '100%',
    marginTop: 20
  }
};
