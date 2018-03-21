import React, { Component } from 'react';
import { Image } from 'react-native';

import LayoutView from '../../dumbs/layoutView';

import styles from './styles';

const logo = require('../../../../assets/images/logos/logo_white.png');

const SplashScreen = props => (
  <LayoutView type="container" style={styles.container}>
    <Image source={logo} style={styles.logo} resizeMode="contain" />
  </LayoutView>
);

export default SplashScreen;
