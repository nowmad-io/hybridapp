import React from 'react-native';

import { colors } from '../../parameters';

export default {
  tags: (selected = false) => ({
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 28,
    backgroundColor: selected ? colors.green : colors.white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8
  }),
  text: (selected = false) => ({
    fontSize: 10,
    color: selected ? colors.white : colors.black 
  })
}
