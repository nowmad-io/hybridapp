import React, { StyleSheet } from 'react-native';

import { colors, sizes } from '../../../parameters';

export { sizes }

export default {
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
};
