const React = require('react-native');

const { StyleSheet } = React;

import { colors } from '../../parameters';

export default (selected = false, type = null) => {
  const wrapperSize = (selected ? 45 : 37);
  // wrapperSize = type === 'friends_friend' ? wrapperSize * 0.8 : wrapperSize;

  const wrapper = {
    width: wrapperSize,
    height: wrapperSize,
    alignItems: 'center',
  };
  const shadowBackgroundColor = selected ? colors.greenShadowDark : colors.greenShadow
  const shadow = {
    backgroundColor: (type === 'me') ? 'none' : shadowBackgroundColor,
    borderRadius: 100,
    width: wrapperSize - 1,
    height: wrapperSize - 1,
    justifyContent: 'center',
    alignItems: 'center',
  };
  const thumbnailWrapper = {
    backgroundColor: selected ? colors.green : colors.white,
    borderRadius: 18,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    ...colors.blackShadow
  };
  const triangle = {
    position: 'absolute',
    bottom: selected ? 3 : 0,
    borderTopWidth: 6,
    borderRightWidth: 6/2.0,
    borderBottomWidth: 0,
    borderLeftWidth: 6/2.0,
    borderTopColor: selected ? colors.green : colors.white,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    'zIndex': 2
  };

  return { wrapper, shadow, thumbnailWrapper, triangle}
};
