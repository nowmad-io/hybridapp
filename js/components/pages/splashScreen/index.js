import React from 'react';
import FastImage from 'react-native-fast-image';

import LayoutView from '../../dumbs/layoutView';

import styles from './styles';

const logo = require('../../../../assets/images/logos/logo_white.png');

const SplashScreen = () => (
  <LayoutView type="container" style={styles.container}>
    <FastImage
      source={logo}
      style={styles.logo}
      resizeMode={FastImage.resizeMode.contain}
    />
  </LayoutView>
);

export default SplashScreen;
