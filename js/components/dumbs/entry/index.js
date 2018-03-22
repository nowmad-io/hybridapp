import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, StyleSheet } from 'react-native';
import _ from 'lodash';

import ReviewHeader from './reviewHeader';
import Review from './review';

import Icon from '../icon';
import Text from '../text';
import Button from '../button';
import Pictures from '../pictures';
import Tag from '../tag';

import { colors, sizes, carousel } from '../../../parameters';

export default class Entry extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    navigation: PropTypes.object,
    onHeaderPress: PropTypes.func,
    place: PropTypes.object.isRequired,
    panY: PropTypes.object,
    min: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const level1Y = props.panY.interpolate({
      inputRange: [props.max, props.step],
      outputRange: [props.min + props.step, 0],
      extrapolate: 'clamp',
    });

    const buttonY = props.panY.interpolate({
      inputRange: [props.max, props.step],
      outputRange: [props.step - props.max, 0],
      extrapolate: 'clamp',
    });

    this.state = {
      level1Y,
      buttonY,
    };
  }

  onPressAddReview() {
    this.props.navigation.navigate('AddReview', { place: this.props.place });
  }

  onPressEditReview(review) {
    this.props.navigation.navigate('AddReview', {
      place: this.props.place,
      review,
    });
  }

  onPressReview(review) {
    this.props.navigation.navigate('ReviewDetail', {
      review,
    });
  }

  render() {
    const { place: { address, reviews, all_reviews: allReviews }, style } = this.props;
    const { level1Y, buttonY } = this.state;
    const reviewsToOrder = allReviews || reviews;
    const starredReview = _.find(reviewsToOrder, (review) => {
      if (allReviews) {
        return reviews[0].created_by.email === review.created_by.email;
      }
      return review.user_type === 'me';
    });
    const myReview = !allReviews ? starredReview : _.find(reviewsToOrder, review => review.user_type === 'me');
    const friendsReviews = starredReview ?
      _.filter(reviewsToOrder, review => review.id !== starredReview.id) : reviewsToOrder;
    const orderedReviews = _.compact(_.concat(_.compact([starredReview]), friendsReviews));
    const thumbnails = _.without(reviews, reviews[0]);
    const pictures = _.flatten(reviews.map(review => review.pictures));
    const categories = _.uniqWith(_.flatten(reviews.map(review => review.categories)));

    return (
      <View style={[styles.card, style]}>
        <Animated.View
          style={{
            transform: [
              { translateY: level1Y },
            ],
          }}
        >
          <ReviewHeader
            reviews={allReviews ? reviews : orderedReviews}
            placeAddress={address}
            showcase
            thumbnails={thumbnails}
            onPress={this.props.onHeaderPress}
          />
          <View style={styles.item}>
            <Pictures pictures={pictures} />
            <View style={styles.tagsWrapper}>
              {_.slice(categories, 0, 3).map(categorie => (
                <Tag
                  key={categorie.id}
                  text={categorie.name}
                />
              ))}
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 99999,
            transform: [
              { translateY: buttonY },
            ],
          }}
        >
          <Button
            wrapped
            onPress={() => (myReview ? this.onPressEditReview(myReview) : this.onPressAddReview())}
          >
            <Text>{myReview ? 'My review' : 'Add review'}</Text>
          </Button>
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              { translateY: level1Y },
            ],
          }}
        >
          <View style={styles.addressWrapper}>
            <Text style={styles.address}>
              <Icon style={styles.addressIcon} name="location-on" /> {address}
            </Text>
          </View>
          {orderedReviews && orderedReviews.map(review => (
            <Review
              key={review.id}
              review={review}
              onPress={() => this.onPressReview(review)}
            />
          ))}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    position: 'relative',
    minHeight: sizes.height,
    paddingBottom: sizes.toolbarHeight,
    borderColor: colors.green,
    borderTopWidth: carousel.border,
    borderRadius: 2,
    elevation: 3,
  },
  addressWrapper: {
    borderColor: colors.green,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 1,
    paddingBottom: 4,
  },
  address: {
    paddingTop: 4,
    fontSize: 12,
    alignSelf: 'center',
    color: colors.grey,
  },
  addressIcon: {
    fontSize: 10,
    color: colors.grey,
  },
  item: {
    flexDirection: 'row',
    flex: 1,
  },
  tagsWrapper: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});
