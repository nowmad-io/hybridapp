import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import shortid from 'shortid';

import { selectFullPlace } from '../../../reducers/entities';
import ReviewHeader from './reviewHeader';
import Review from './review';

import Icon from '../icon';
import Text from '../text';
import Button from '../button';
import Pictures from '../pictures';
import Tag from '../tag';

import { colors, sizes, carousel } from '../../../parameters';

class Entry extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    navigation: PropTypes.object,
    me: PropTypes.object,
    onHeaderPress: PropTypes.func,
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
    const { place: { address, reviews }, style, me } = this.props;
    const myReview = me ? _.find(reviews, review => review.created_by.id === me.id) : null;
    const orderedReviews = myReview ?
      [myReview, ..._.filter(reviews, ({ id }) => id !== myReview.id)] : reviews;
    const thumbnails = _.drop(orderedReviews);
    const pictures = _.flatten(reviews.map(review => review.pictures));
    const categories = _.uniqWith(_.flatten(reviews.map(review => review.categories)), _.isEqual);

    return (
      <View style={[styles.card, style]}>
        <View>
          <ReviewHeader
            reviews={orderedReviews}
            placeAddress={address}
            showcase
            thumbnails={thumbnails}
            onPress={this.props.onHeaderPress}
          />
          <View style={styles.item}>
            <Pictures pictures={pictures} />
            <View style={styles.tagsWrapper}>
              {categories.map(categorie => (
                <Tag
                  key={shortid.generate()}
                  text={categorie.name}
                />
              ))}
            </View>
          </View>
        </View>
        <View>
          <Button
            wrapped
            onPress={() => this.onPressAddReview(myReview)}
          >
            <Text>{myReview ? 'My review' : 'Add review'}</Text>
          </Button>
        </View>
        <View>
          <View style={styles.addressWrapper}>
            <Text style={styles.address}>
              <Icon style={styles.addressIcon} name="location-on" /> {address}
            </Text>
          </View>
          {orderedReviews && orderedReviews.map(review => (
            <Review
              key={shortid.generate()}
              review={review}
              onPress={() => this.onPressReview(review)}
            />
          ))}
        </View>
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
