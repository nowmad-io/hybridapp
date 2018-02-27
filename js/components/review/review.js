import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, TouchableOpacity } from 'react-native';
import shortid from 'shortid';

import Text from '../dumbs/text';
import Tag from '../dumbs/tag';
import ReviewHeader from './reviewHeader';
import { reviewStyle, showcaseStyles } from './styles';
const pictureHolder = require('../../../assets/images/picture_holder.jpg');

const Review = props => {
  const categories = props.review.categories.map((categorie) => {
    return categorie.name
  });

  const pictures = props.review.pictures;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={props.onPress ? 0.2 : 1}
      style={reviewStyle.reviewWrapper}>
      <ReviewHeader reviews={[props.review]} />
      <View>
        <Image
          resizeMode='cover'
          source={pictures.length ? {uri: pictures[0].source} : pictureHolder}
          style={showcaseStyles.mainPicture()}
        />
        {pictures.length ? (
          <Text style={reviewStyle.caption}>
            {pictures[0].caption}
          </Text>
        ) : null}
      </View>
      <View style={showcaseStyles.tags}>
        {props.review.categories.map((categorie) => (
          <Tag
            key={shortid.generate()}
            text={categorie.name} />
        ))}
      </View>
    </TouchableOpacity>
  )
};

Review.defaultProps = {}

Review.propTypes = {
  review: PropTypes.object
};

export default Review;
