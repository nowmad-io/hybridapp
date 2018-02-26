import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated, View, StyleSheet } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';

import ReviewHeader from './reviewHeader';

import Icon from '../icon';
import Text from '../text';
import Button from '../button';
import Pictures from '../pictures';
import Tag from '../tag';
import { Review } from '../../review';

import { colors, sizes, carousel } from '../../../parameters';

export default class Entry extends Component {

  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    navigation: PropTypes.object,
    place: PropTypes.object.isRequired,
    panY: PropTypes.object
  };

  constructor(props) {
    super(props);
    const level1Y = props.panY.interpolate({
      inputRange: [props.max, props.step],
      outputRange: [props.min + props.step, 0],
      extrapolate: 'clamp',
    });

    let buttonY = props.panY.interpolate({
      inputRange: [props.max, props.step],
      outputRange: [ props.step - props.max, 0],
      extrapolate: 'clamp',
    });

    this.state = {
      level1Y,
      buttonY
    };
  }

  onPressAddReview() {
    this.props.navigation.navigate('AddReview', { place: this.props.place });
  }

  onPressEditReview(review) {
    this.props.navigation.navigate('AddReview', {
      place: this.props.place,
      review
    });
  }

  onPressReview(review) {
    this.props.navigation.navigate('ReviewDetail', {
      review: review
    });
  }

  render () {
    const { place: { name, types, scope, address, reviews, all_reviews }, style } = this.props,
          { level1Y, buttonY } = this.state,
          reviewsToOrder = all_reviews || reviews,
          starredReview = _.find(reviewsToOrder, (review) => {
            if (all_reviews) {
              return reviews[0].created_by.email === review.created_by.email
            }
            return review.user_type === 'me';
          }),
          myReview = !all_reviews ? starredReview : _.find(reviewsToOrder, (review) => review.user_type === 'me'),
          friendsReviews = starredReview ? _.filter(reviewsToOrder, (review) => review.id !== starredReview.id) : reviewsToOrder,
          orderedReviews = _.compact(_.concat(_.compact([starredReview]), friendsReviews)),
          thumbnails = _.without(reviews, reviews[0]),
          pictures = _.flatten(reviews.map((review) => review.pictures)),
          categories = _.uniqWith(_.flatten(reviews.map((review) => review.categories)));

    return (
      <View style={[styles.card, style]}>
        <Animated.View
          style={{
            transform: [
              { translateY: level1Y }
            ]
          }}
        >
          <ReviewHeader
            reviews={all_reviews ? reviews : orderedReviews}
            placeAddress={address}
            showcase={true}
            thumbnails={thumbnails}
            onPress={this.props.onHeaderPress}
          />
          <View style={styles.item}>
            <Pictures pictures={pictures} />
            <View style={styles.tagsWrapper}>
              {_.slice(categories, 0, 3).map((categorie) => (
                <Tag
                  key={shortid.generate()}
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
              { translateY: buttonY }
            ]
          }}
        >
          <Button
            wrapped
            onPress={() => myReview ? this.onPressEditReview(myReview) : this.onPressAddReview()}
          >
            <Text>{myReview ? 'My review' : 'Add review'}</Text>
          </Button>
        </Animated.View>
        <Animated.View
          style={{
            transform: [
              { translateY: level1Y }
            ]
          }}
        >
          <View style={styles.addressWrapper}>
            <Text style={styles.address}>
              <Icon style={styles.addressIcon} name="location-on" /> {address}
            </Text>
          </View>
          {orderedReviews && orderedReviews.map((review) => (
            <Review
              key={shortid.generate()}
              review={review}
              onPress={() => this.onPressReview(review)}/>
          ))}
        </Animated.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    position: 'relative',
    minHeight: sizes.height,
    paddingBottom: sizes.toolbarHeight,
    borderColor: colors.green,
    borderTopWidth: carousel.border,
    borderRadius: 2
  },
  addressWrapper: {
    borderColor: colors.green,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 1,
    paddingBottom: 4
  },
  address: {
    paddingTop: 4,
    fontSize: 12,
    alignSelf: 'center',
    color: colors.grey,
  },
  addressIcon: {
    fontSize: 10,
    color: colors.grey
  },
  item: {
    flexDirection: 'row',
    flex: 1
  },
  tagsWrapper: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
    alignItems: 'flex-start',
    flexDirection: 'row',
  }
});
