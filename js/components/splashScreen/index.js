import React, { Component } from 'react';
import { Image } from 'react-native';

import Container from '../dumbs/container';

import styles from './styles';
const logo = require('../../../assets/images/logos/logo_white.png');

const SplashScreen = props => (
  <Container style={styles.container}>
    <Image source={logo} style={styles.logo} />
  </Container>
);

export default SplashScreen;
