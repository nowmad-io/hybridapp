import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import shortid from 'shortid';

import Icon from '../icon';
import Text from '../text';
import Thumbnail from '../thumbnail';

import { colors, carousel } from '../../../parameters';
const googleImg = require('../../../../assets/images/icons/google.png');

export default class ReviewHeader extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    reviews: PropTypes.array,
    showcase: PropTypes.bool,
    thumbnails: PropTypes.array,
    placeAddress: PropTypes.string
  };

  static defaultProps = {
    thumbnails: [],
    showcase: false,
    placeAddress: ''
  };

  render() {
    const { reviews, showcase, thumbnails, placeAddress, onPress } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.wrapper}>
          <Thumbnail style={styles.thumbnail} source={reviews[0].created_by.picture ? {uri: reviews[0].created_by.picture} : googleImg} />
          <View style={styles.textWrapper}>
            <Text numberOfLines={1}>
              <Text>
                {reviews[0].created_by === 'me' ? 'You' : reviews[0].created_by.first_name }
              </Text>
              {reviews.length > 1 ? ` and ${reviews.length - 1} more friend${reviews.length > 2 ? 's' : ''}` : ''}
            </Text>
            <Text numberOfLines={1} note>- { reviews[0].short_description } -</Text>
            { showcase && (
              <Text numberOfLines={1} style={styles.address}>
                <Icon style={styles.addressIcon} name="location-on" /> {placeAddress}
              </Text>
            )}
          </View>
          {thumbnails.map((review, index) => (
            <Thumbnail
              xsmall
              key={shortid.generate()}
              style={[
                styles.thumbnailFriends,
                {
                  right: index * 8 + 8,
                  zIndex: 100 - index
                }
              ]}
              source={{uri: review.created_by.picture}}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
		alignItems: 'flex-start',
		borderRadius: 2,
		backgroundColor: colors.white,
    height: - carousel.level1
  },
  thumbnail: {
    alignSelf: 'flex-start'
  },
  textWrapper: {
    marginLeft: 8,
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  address: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 12,
    color: colors.grey,
  },
  addressIcon: {
    fontSize: 10,
    color: colors.grey
  },
  thumbnailFriends: {
    position: 'absolute',
    top: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.white
  }
});
