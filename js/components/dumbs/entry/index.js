import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { selectFullPlace } from '../../../reducers/entities';
import Review from './review';
import Icon from '../icon';


import { colors, carousel } from '../../../parameters';

class Entry extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    me: PropTypes.object,
    place: PropTypes.object.isRequired,
  };

  addOrEditReview = (myReview = false) => () => {
    const { place } = this.props;

    this.props.navigation.navigate('AddReview', {
      place,
      review: myReview && {
        ...myReview,
        pictures: !place.google ? myReview.pictures : [],
      },
    });
  }

  placeDetails = () => {
    this.props.navigation.navigate('PlaceDetails', {
      place: this.props.place,
    });
  }

  UNSAFE_componentWillReceiveProps({ me, place }) {
    console.log('this.props.me', this.props.me);
    console.log('me', me);
    console.log('this.props.me === me', this.props.me === me);
    console.log('--');
    console.log('this.props.place', this.props.place);
    console.log('place', place);
    console.log('this.props.place === place', this.props.place === place);
    console.log('----------------------------------------');
  }

  render() {
    console.count(`entry ${this.props.place.id}`);
    const { place: { reviews, google }, me } = this.props;

    const myReview = me ? _.find(reviews, r => (r.created_by && r.created_by.id === me.id)) : null;
    const review = myReview || reviews[0];
    const pictures = _.flatten(reviews.map(r => r.pictures));
    const categories = _.uniqWith(_.flatten(reviews.map(r => r.categories)), _.isEqual);
    const others = _.compact(reviews.map(r => (r.id !== review.id ? r.created_by : null)));

    return (
      <View
        style={[
          styles.card,
          google && styles.googleCard,
        ]}
      >
        <Review
          onPress={() => (!google && this.placeDetails())}
          review={{
            ...review,
            categories,
            pictures,
          }}
          others={others}
          google={!!google}
          cover
        />
        <TouchableOpacity
          style={styles.cta}
          activeOpacity={0.8}
          onPress={this.addOrEditReview(myReview)}
        >
          <Icon
            name={(myReview && !google) ? 'edit' : 'playlist-add'}
            style={[
              styles.cta_icon,
              myReview && styles.cta_edit,
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const placeSelector = selectFullPlace();

  return (state, props) => ({
    place: props.place.google ? props.place : placeSelector(state, props.place.id),
    me: state.auth.me,
  });
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
