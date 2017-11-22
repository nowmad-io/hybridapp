import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container } from 'native-base';

import styles from './styles';
const logo = require('../../../images/logos/logo_white.png');

const SplashScreen = props => (
  <Container style={styles.container}>
    <Image source={logo} style={styles.logo} />
  </Container>
);

export default SplashScreen;
