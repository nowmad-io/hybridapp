import { StyleSheet } from 'react-native';

import { colors } from '../../../parameters';

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  logo: {
    width: '60%',
    height: '60%',
  },
};
