import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View, CardItem, Icon } from 'native-base';
import shortid from 'shortid';

import Text from '../dumbs/text';
import Tag from '../tag';
import ReviewHeader from './reviewHeader';
import { reviewStyle, showcaseStyles } from './styles';
const pictureHolder = require('../../../assets/images/picture_holder.jpg');

const Review = props => {
  const categories = props.review.categories.map((categorie) => {
    return categorie.name
  });

  const pictures = props.review.pictures;

  return (
    <View style={reviewStyle.reviewWrapper}>
      <ReviewHeader reviews={[props.review]} />
      <CardItem style={showcaseStyles.picturesWrapper}>
        <Image
          source={pictures.length ? {uri: pictures[0].source} : pictureHolder}
          style={showcaseStyles.mainPicture()}
        />
        {pictures.length ? (
          <Text style={reviewStyle.caption}>
            {pictures[0].caption}
          </Text>
        ) : null}
      </CardItem>
      <CardItem>
        {props.review.categories.map((categorie) => (
          <Tag
            key={shortid.generate()}
            text={categorie.name} />
        ))}
      </CardItem>
    </View>
  )
};

Review.defaultProps = {}

Review.propTypes = {
  review: PropTypes.object
};

export default Review;
