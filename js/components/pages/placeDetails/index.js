import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet, BackHandler, View, ScrollView,
} from 'react-native';

import Review from '../../dumbs/entry/review';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';
import LayoutView from '../../dumbs/layoutView';

import { selectFullPlace } from '../../../reducers/entities';

import { colors, userTypes } from '../../../parameters';

const isOwn = type => type === userTypes.me;

class PlaceDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    review: PropTypes.object,
    others: PropTypes.array,
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

  goToDetails = (reviewId) => {
    this.props.navigation.navigate('ReviewDetails', { reviewId });
  }

  addOrEditReview = () => {
    const { review: { place, user_type: userType, id } } = this.props;
    this.props.navigation.navigate('AddReview', {
      placeId: place,
      reviewId: isOwn(userType) ? id : null,
    });
  }

  render() {
    const { review: firstReview, others } = this.props;

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
                onPress={() => this.goToDetails(review.id)}
              />
            </View>
          ))}
        </ScrollView>
        <Button light style={styles.actionButton} onPress={this.addOrEditReview}>
          <Text>{isOwn(firstReview.user_type) ? 'Edit My Review' : 'Add Review'}</Text>
        </Button>
      </LayoutView>
    );
  }
}

const makeMapStateToProps = () => {
  const placeSelector = selectFullPlace();

  const mapStateToProps = (state, props) => {
    const { placeId } = props.navigation.state.params;
    const { review, others } = placeSelector(state, placeId);

    return {
      review,
      others,
    };
  };

  return mapStateToProps;
};

export default connect(makeMapStateToProps)(PlaceDetails);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: 4,
  },
  actionButton: {
    elevation: 8,
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
