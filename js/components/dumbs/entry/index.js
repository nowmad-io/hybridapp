import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { selectFullPlace, selectGPlaceReview } from '../../../reducers/entities';
import Review from './review';
import Icon from '../icon';

import { colors, carousel, userTypes } from '../../../parameters';

const isOwn = type => type === userTypes.me;

class Entry extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    gPlace: PropTypes.bool,
    // eslint-disable-next-line
    placeId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    review: PropTypes.object,
    allPictures: PropTypes.array,
    allCategories: PropTypes.array,
    others: PropTypes.array,
    place: PropTypes.object,
  };

  addOrEditReview = () => this.props.navigation.navigate('AddReview', {
    place: this.props.place,
    review: isOwn(this.props.review.user_type) ? this.props.review : null,
    gPlace: this.props.gPlace,
  });

  goToDetails = () => {
    const {
      navigation, place, review,
    } = this.props;

    if (place.reviews.length > 1) {
      navigation.navigate('PlaceDetails', { placeId: place.id });
    } else {
      navigation.navigate('ReviewDetails', { reviewId: review.id });
    }
  }

  render() {
    const {
      gPlace, review, allPictures, allCategories, others,
    } = this.props;

    return (
      <View
        style={[
          styles.card,
          gPlace && styles.gPlace,
        ]}
      >
        <Review
          onPress={() => (!gPlace && this.goToDetails())}
          review={{
            ...review,
            pictures: allPictures,
            categories: allCategories,
          }}
          others={others}
          gPlace={gPlace}
          cover
        />
        <TouchableOpacity
          style={styles.cta}
          activeOpacity={0.8}
          onPress={this.addOrEditReview}
        >
          <Icon
            name={isOwn(review.user_type) ? 'edit' : 'playlist-add'}
            style={[
              styles.cta_icon,
              isOwn(review.user_type) && styles.cta_edit,
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const placeSelector = selectFullPlace();
  const gPlaceSelector = selectGPlaceReview();

  return (state, props) => (
    props.gPlace ? gPlaceSelector(state) : placeSelector(state, props.placeId)
  );
};

export default connect(makeMapStateToProps)(Entry);

const styles = StyleSheet.create({
  card: {
    height: carousel.level2,
    backgroundColor: colors.white,
    position: 'relative',
    borderColor: colors.green,
    borderTopWidth: carousel.border,
    borderRadius: 2,
    elevation: 3,
  },
  googleCard: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.lightGreen,
  },
  cta: {
    backgroundColor: colors.yellowTransparent,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 64,
    width: 64,
    borderTopRightRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 10,
  },
  cta_icon: {
    color: colors.white,
    fontSize: 32,
  },
  cta_edit: {
    fontSize: 28,
  },
});
