import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { View, Card, CardItem, Text, Button, Icon } from 'native-base';
import { ParallaxImage } from 'react-native-snap-carousel';
import _ from 'lodash';
import shortid from 'shortid';

import { Showcase, Review } from '../review';
import BasicButton from '../basicButton';

import { entryStyles } from './styles';

class Entry extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    place: PropTypes.object.isRequired,
    index: PropTypes.number,
    selected: PropTypes.bool,
    level: PropTypes.number
  };

  onPressAddReview = () => {
    this.props.navigation.navigate('AddReview', { place: this.props.place })
  }

  render () {
    let { place: { reviews }, index, selected, level } = this.props;

    const myReview = _.find(reviews, (review) => {
      return review.user_type === 'me';
    })

    const otherReviews = myReview ? _.filter(reviews, (review) => review.id !== myReview.id) : reviews;

    const orderedReviews = _.concat(_.compact([myReview]), otherReviews);

    return (
      <View style={entryStyles.slideInnerContainer(index)}>
        <ScrollView
          scrollEnabled={level > 1}
          showsVerticalScrollIndicator={false}
        >
          <Card style={entryStyles.card(selected, level)}>
            {(level < 2) ? (
              <Showcase
                reviews={orderedReviews}
                selected={selected} />
            ) : (
              <View>
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
              </View>
            )}
          </Card>
        </ScrollView>
        { level > 0 && (
          <BasicButton
            text='ADD REVIEW'
            onPress={this.onPressAddReview}>
            <Icon
              style={entryStyles.wishListIcon}
              name="md-heart-outline" />
          </BasicButton>
        )}
      </View>
    );
  }
}

export default Entry
