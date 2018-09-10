import React, { Component } from 'react';
import {
  StyleSheet, View, ScrollView, BackHandler, TouchableOpacity, Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import LayoutView from '../../dumbs/layoutView';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';
import Icon from '../../dumbs/icon';
import Review from '../../dumbs/entry/review';

import { colors } from '../../../parameters';

export default class ReviewDetails extends Component {
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

  openUrl = url => Linking.openURL(url);

  render() {
    const { place, review } = this.props.navigation.state.params;

    return (
      <LayoutView type="container">
        <LayoutView type="header">
          <LayoutView type="left">
            <Button transparent onPress={this.onBackPress} icon="arrow-back" header />
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <ScrollView contentContainerStyle={styles.content}>
          <Review
            review={review}
            style={styles.review}
            detail
          />
          <View style={styles.otherDetails}>
            <Text style={styles.information}>
              {review.information}
            </Text>
            {review.link_1 !== '' && (
              <TouchableOpacity
                onPress={() => this.openUrl(review.link_1)}
                style={styles.links}
              >
                <Icon name="link" rotate={-40} style={styles.linkIcon} />
                <Text style={styles.information}>
                  {review.link_1}
                </Text>
              </TouchableOpacity>
            )}
            {review.link_2 !== '' && (
              <TouchableOpacity
                onPress={() => this.openUrl(review.link_2)}
                style={styles.links}
              >
                <Icon name="link" rotate={-40} style={styles.linkIcon} />
                <Text
                  style={[
                    styles.information,
                    styles.link2,
                  ]}
                >
                  {review.link_2}
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  review: {
    paddingTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
  },
  otherDetails: {
    marginTop: 12,
    flex: 1,
  },
  information: {
    fontSize: 14,
    lineHeight: 22,
  },
  links: {
    flexDirection: 'row',
    marginTop: 22,
  },
  linkIcon: {
    fontSize: 24,
    color: colors.grey,
    marginRight: 4,
  },
  link2: {
    marginBottom: 12,
  },
});
