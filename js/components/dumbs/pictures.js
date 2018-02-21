import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

import LayoutView from './layoutView';

import { colors } from '../../parameters';

const googleImg = require('../../../assets/images/icons/google.png');
const pictureHolder = require('../../../assets/images/picture_holder.jpg');

export default class Pictures extends Component {
  static propTypes = {
    pictures: PropTypes.array
  };

  render() {
    const { pictures } = this.props;

    return (
      <LayoutView type='wrapper'>
        <Image
          source={pictures.length ? {uri: pictures[0].source} : pictureHolder}
          style={[
            styles.mainPicture,
            { marginRight: pictures.length ? 1 : 0 }
          ]} />
        {pictures.length > 1 && (
          <View style={styles.wrapperRight}>
              <Image source={{uri: pictures[1].source}} style={[
                styles.pictures,
                {
                  marginLeft: pictures.length > 1 ? 1 : 0,
                  marginBottom: pictures.length > 2 ? 1 : 0,
                  marginTop: 0
                }
              ]} />
            {pictures.length > 2 && (
              <Image source={{uri: pictures[2].source}} style={[
                styles.pictures,
                {
                  marginLeft: pictures.length > 1 ? 1 : 0,
                  marginBottom: 0,
                  marginTop: pictures.length > 2 ? 1 : 0,
                }
              ]} />
            )}
          </View>
        )}
      </LayoutView>
    );
  }
};

const styles = StyleSheet.create({
  mainPicture: {
    height: 102,
    width: '100%',
    flex: 1,
  },
  pictures: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  wrapperRight: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  }
});