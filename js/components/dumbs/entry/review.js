import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';

import Text from '../text';
import Tag from '../tag';
import ReviewHeader from './reviewHeader';

import { colors } from '../../../parameters';

const pictureHolder = require('../../../../assets/images/picture_holder.jpg');

export default class Review extends PureComponent {
  static propTypes = {
    review: PropTypes.object,
    onPress: PropTypes.func,
  }

  render() {
    const { onPress, review } = this.props;
    const { pictures } = review;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={onPress ? 0.2 : 1}
        style={styles.reviewWrapper}
      >
        <ReviewHeader reviews={[review]} />
        <View>
          <Image
            resizeMode="cover"
            source={pictures.length ? { uri: pictures[0].source } : pictureHolder}
            style={styles.mainPicture}
          />
          {pictures.length ? (
            <Text style={styles.caption}>
              {pictures[0].caption}
            </Text>
          ) : null}
        </View>
        <View style={styles.tags}>
          {review.categories.map(categorie => (
            <Tag
              key={categorie.id}
              text={categorie.name}
            />
          ))}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  reviewWrapper: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  caption: {
    position: 'absolute',
    top: 8,
    left: 8,
    color: colors.white,
    fontSize: 14,
  },
  mainPicture: {
    height: 102,
    width: '100%',
  },
  tags: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
