import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated, View } from 'react-native';
import _ from 'lodash';
import shortid from 'shortid';

import Icon from '../dumbs/icon';
import Text from '../dumbs/text';
import Button from '../dumbs/button';
import { Showcase, Review } from '../review';

import { entryStyles } from './styles';

class Entry extends Component {

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

  constructor(props) {
    super(props);
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
        <View style={[entryStyles.card, style]}>
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
            <View style={entryStyles.addressWrapper}>
              <Text style={entryStyles.address}>
                <Icon style={entryStyles.addressIcon} name="location-on" /> {address}
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
}

export default Entry
