import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, BackHandler, View, ScrollView,
} from 'react-native';

import Review from '../../dumbs/entry/review';
import Button from '../../dumbs/button';
import LayoutView from '../../dumbs/layoutView';

import { colors } from '../../../parameters';

export default class PlaceDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  goToDetails = (review) => {
    const { place } = this.props.navigation.state.params;

    this.props.navigation.navigate('ReviewDetails', {
      place,
      review,
    });
  }

  render() {
    const { review: firstReview, others } = this.props.navigation.state.params;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={this.onBackPress} icon="arrow-back" header />
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <ScrollView contentContainerStyle={styles.content}>
          {[firstReview, ...others].map(review => (
            <View
              key={review.id}
              style={styles.review}
            >
              <Review
                review={review}
                onPress={() => this.goToDetails(review)}
              />
            </View>
          ))}
        </ScrollView>
      </LayoutView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 4,
  },
  review: {
    flex: 0,
    minHeight: 164,
    marginVertical: 4,
    marginHorizontal: 8,
    borderColor: colors.transparent,
    backgroundColor: colors.white,
    elevation: 2,
  },
});
