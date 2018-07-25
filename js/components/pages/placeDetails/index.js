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
    place: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      place: props.navigation.state.params.place,
    };
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

  render() {
    const { place: { reviews } } = this.state;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={this.onBackPress} icon="arrow-back" header />
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <ScrollView style={styles.content}>
          {reviews.map(review => (
            <View
              key={review.id}
              style={styles.review}
            >
              <Review review={review} />
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
  },
  review: {
    flex: 0,
    minHeight: 162,
    marginTop: 8,
    marginHorizontal: 8,
    borderColor: colors.transparent,
    backgroundColor: colors.white,
    elevation: 2,
  },
});
