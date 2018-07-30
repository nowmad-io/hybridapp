import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import LayoutView from '../../dumbs/layoutView';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';
import Icon from '../../dumbs/icon';
import Review from '../../dumbs/entry/review';

import styles from './styles';

export default class ReviewDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    const { review } = props.navigation.state.params;

    this.state = {
      review,
    };
  }

  render() {
    const { review } = this.state;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} name="arrow-back" />
              <Text>
Return to map
              </Text>
            </Button>
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <View style={styles.content}>
          <Review review={review} />
          <Text style={styles.information}>
            {review.information}
          </Text>
        </View>
      </LayoutView>
    );
  }
}
