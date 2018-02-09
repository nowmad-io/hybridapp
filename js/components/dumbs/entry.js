import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated, View, StyleSheet } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';

import Icon from './icon';
import Text from './text';
import Button from './button';
import { Showcase, Review } from '../review';

import { colors, sizes } from '../../parameters';

export default class Entry extends Component {

  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    navigation: PropTypes.object,
    place: PropTypes.object.isRequired,
    scrollY: PropTypes.object
  };

  onPressAddReview() {
    this.props.navigation.navigate('AddReview', { place: this.props.place })
  }

  onPressEditReview(review) {
    this.props.navigation.navigate('AddReview', {
      place: this.props.place,
      review
    })
  }

  render () {
    const { place: { name, types, scope, address, reviews, all_reviews }, style } = this.props;

    const reviewsToOrder = all_reviews || reviews;

    const starredReview = _.find(reviewsToOrder, (review) => {
      if (all_reviews) {
        return reviews[0].created_by.email === review.created_by.email
      }
      return review.user_type === 'me';
    })

    const myReview = !all_reviews ? starredReview : _.find(reviewsToOrder, (review) => review.user_type === 'me');

    const friendsReviews = starredReview ? _.filter(reviewsToOrder, (review) => review.id !== starredReview.id) : reviewsToOrder;
    const orderedReviews = _.compact(_.concat(_.compact([starredReview]), friendsReviews));

    return (
      <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, style]}>
          <Animated.View>
            <Showcase
              reviews={all_reviews ? reviews : orderedReviews}
              placeAddress={address}
            />
          </Animated.View>
          <Animated.View style={{ zIndex: 99999 }}>
            <Button
              wrapped
              onPress={() => myReview ? this.onPressEditReview(myReview) : this.onPressAddReview()}
            >
              <Text>{myReview ? 'My review' : 'Add review'}</Text>
            </Button>
          </Animated.View>
          <Animated.View>
            <View style={styles.addressWrapper}>
              <Text style={styles.address}>
                <Icon style={styles.addressIcon} name="location-on" /> {address}
              </Text>
            </View>
            {orderedReviews && orderedReviews.map((review) => (
              <Review
                key={shortid.generate()}
                review={review} />
            ))}
          </Animated.View>
        </View>
      </ScrollView>
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
    borderTopWidth: 4,
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
  }
});
