import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { selectFullPlace } from '../../../reducers/entities';
import Review from './review';


import { colors, carousel } from '../../../parameters';

class Entry extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    me: PropTypes.object,
    place: PropTypes.object.isRequired,
  };

  onPressAddReview(myReview = false) {
    this.props.navigation.navigate('AddReview', {
      place: this.props.place,
      review: myReview,
    });
  }

  onPressReview(review) {
    this.props.navigation.navigate('ReviewDetail', {
      review,
    });
  }

  render() {
    const { place: { reviews }, me } = this.props;
    const review = (me ? _.find(reviews, r => r.created_by.id === me.id) : reviews[0])
      || reviews[0];
    const pictures = _.flatten(reviews.map(r => r.pictures));
    const categories = _.uniqWith(_.flatten(reviews.map(r => r.categories)), _.isEqual);
    const others = _.compact(reviews.map(r => (r.id !== review.id ? r.created_by : null)));

    return (
      <View style={styles.card}>
        <Review
          review={{
            ...review,
            categories,
            pictures,
          }}
          others={others}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  const placeSelector = selectFullPlace();

  return {
    place: placeSelector(state, props.place.id),
    me: state.auth.me,
  };
};

export default connect(mapStateToProps)(Entry);

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
});
