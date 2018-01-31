import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Image, View } from 'react-native';
import _ from 'lodash';

import Tag from '../dumbs/tag'
import ReviewHeader from './reviewHeader';

import { showcaseStyles, headerStyles } from './styles';
const pictureHolder = require('../../../assets/images/picture_holder.jpg');

const Showcase = (props) => {
  const pictures = _.flatten(props.reviews.map((review) => {
      return review.pictures
  }));

  const thumbnails = _.without(props.reviews, props.reviews[0]);

  const categories = props.categories ? _.uniqWith(_.flatten(props.reviews.map((review) => {
    return review.categories
  }))) : [];

  return (
    <View>
      <ReviewHeader
        reviews={props.reviews}
        placeAddress={props.placeAddress}
        showcase={true}
        thumbnails={thumbnails}
      />
      <View style={headerStyles.item}>
        <Image
          source={pictures.length ? {uri: pictures[0].source} : pictureHolder}
          style={showcaseStyles.mainPicture(pictures.length > 1)} />
        {pictures.length > 1 && (
          <View style={showcaseStyles.wrapperRight}>
              <Image source={{uri: pictures[1].source}} style={showcaseStyles.pictures(pictures.length)}/>
            {pictures.length > 2 && (
              <Image source={{uri: pictures[2].source}} style={showcaseStyles.pictures(pictures.length, false)}/>
            )}
          </View>
        )}
        <View style={showcaseStyles.tagsWrapper}>
          {_.slice(categories, 0, 3).map((categorie) => (
            <Tag
              key={shortid.generate()}
              text={categorie.name}
            />
          ))}
        </View>
      </View>
    </View>
  )
}


Showcase.propTypes = {
  reviews: PropTypes.array,
  placeAddress: PropTypes.string
};

export default Showcase;
