import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CardItem, Thumbnail, Left, Body } from 'native-base';
import shortid from 'shortid';

import Icon from '../dumbs/icon';
import Text from '../dumbs/text';
import LayoutView from '../dumbs/layoutView';

import { headerStyles } from './styles';

const googleImg = require('../../../assets/images/icons/google.png');

const ReviewHeader = props => (
  <CardItem style={headerStyles.infoWrapper}>
    <Left>
      <Thumbnail style={headerStyles.thumbnail} source={props.reviews[0].created_by.picture ? {uri: props.reviews[0].created_by.picture} : googleImg} />
      <Body>
        <Text>
          <Text>
            {props.reviews[0].created_by === 'me' ? 'You' : props.reviews[0].created_by.first_name }
          </Text>
          {props.reviews.length > 1 ? ` and ${props.reviews.length - 1} more friend${props.reviews.length > 2 ? 's' : ''}` : ''}
        </Text>
        <Text note>- { props.reviews[0].short_description } -</Text>
        { props.showcase && (
          <Text style={headerStyles.address}>
            <Icon style={headerStyles.addressIcon} name="location-on" /> {props.placeAddress}
          </Text>
        )}
      </Body>
      {props.thumbnails.map((review, index) => (
        <Thumbnail
          xsmall
          key={shortid.generate()}
          style={headerStyles.thumbnailFriends(index)}
          source={{uri: review.created_by.picture}}
        />
      ))}
    </Left>
  </CardItem>
);

ReviewHeader.defaultProps = {
  thumbnails: [],
  showcase: false,
  placeAddress: ''
}

ReviewHeader.propTypes = {
  reviews: PropTypes.array,
  showcase: PropTypes.bool,
  thumbnails: PropTypes.array,
  placeAddress: PropTypes.string
};

export default ReviewHeader;
