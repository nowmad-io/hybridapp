import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Animated } from 'react-native';
import { View, Card, CardItem, Text, Button, Icon } from 'native-base';
import { ParallaxImage } from 'react-native-snap-carousel';
import _ from 'lodash';
import shortid from 'shortid';

import { Showcase, Review } from '../review';
import BasicButton from '../basicButton';

import { entryStyles, BREAKPOINT1 } from './styles';

class Entry extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    place: PropTypes.object.isRequired,
    index: PropTypes.number,
    selected: PropTypes.bool,
    level: PropTypes.number,
    scrollY: PropTypes.object
  };

  onPressAddReview = () => {
    this.props.navigation.navigate('AddReview', { place: this.props.place })
  }

  constructor(props) {
    super(props);

    const scaleY = props.scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    this.state = {
      scaleY
    }
  }

  render () {
    const { scaleY } = this.state;
    const { place: { reviews }, index, selected, level } = this.props;

    const myReview = _.find(reviews, (review) => {
      return review.user_type === 'me';
    })

    const otherReviews = myReview ? _.filter(reviews, (review) => review.id !== myReview.id) : reviews;

    const orderedReviews = _.concat(_.compact([myReview]), otherReviews);

    return (
      <ScrollView
        scrollEnabled={level > 1}
        showsVerticalScrollIndicator={false}
      >
        <Card style={entryStyles.card(selected)}>
          <Showcase
            reviews={orderedReviews}
            selected={selected}
          />
          <Animated.View
            style={{
              transform: [
                { scaleY },
              ],
            }}
          >
            <View style={entryStyles.addressWrapper}>
              <Text style={entryStyles.address}>
                <Icon style={entryStyles.addressIcon} name="md-pin" />  River Garonne, Bordeaux, France
              </Text>
            </View>
            {orderedReviews.map((review) => (
              <Review
                key={shortid.generate()}
                review={review} />
            ))}
          </Animated.View>
          <BasicButton
            text='ADD REVIEW'
            onPress={this.onPressAddReview}>
            <Icon
              style={entryStyles.wishListIcon}
              name="md-heart-outline" />
          </BasicButton>
        </Card>
      </ScrollView>
    );
  }
}

export default Entry
