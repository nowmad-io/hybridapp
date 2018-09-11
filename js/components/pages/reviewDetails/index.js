import React, { Component } from 'react';
import {
  StyleSheet, View, ScrollView, BackHandler, TouchableOpacity, Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LayoutView from '../../dumbs/layoutView';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';
import Map from '../../dumbs/map';
import Marker from '../../dumbs/marker';
import Icon from '../../dumbs/icon';
import Review from '../../dumbs/entry/review';

import { colors, sizes, userTypes } from '../../../parameters';

import { selectFullReview } from '../../../reducers/entities';

const isOwn = type => type === userTypes.me;

class ReviewDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    place: PropTypes.object,
    review: PropTypes.object,
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillReceiveProps({ place, review }) {
    console.log('this.props.review', this.props.review);
    console.log('review', review);
    console.log('this.props.review === review', this.props.review === review);
    console.log('============================================');
    console.log('this.props.place', this.props.place);
    console.log('place', place);
    console.log('this.props.place === place', this.props.place === place);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.goBack();
    return true;
  }

  onMapReady = () => {
    const { place } = this.props;

    this._map.animateToCoordinate({
      longitude: place.longitude,
      latitude: place.latitude,
    });
  }

  onAddressLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this._map.updatePadding({ top: height });
  }

  openUrl = url => Linking.openURL(url);

  addOrEditReview = () => {
    const { place, review } = this.props;

    this.props.navigation.navigate('AddReview', {});
  }

  render() {
    const { place, review } = this.props;
    console.count('rendering reviewDetails');

    return (
      <LayoutView type="container">
        <LayoutView type="header" style={styles.header}>
          <LayoutView type="left">
            <Button
              transparent
              onPress={this.onBackPress}
              icon="close"
              header
              iconStyle={styles.headerButton}
            />
          </LayoutView>
          <LayoutView type="right" />
        </LayoutView>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.infoWrapper}>
            <Review
              review={review}
              style={styles.review}
              detail
            />
            <Text
              style={[
                styles.text,
                styles.information,
              ]}
            >
              {review.information}
            </Text>
            {review.link_1 !== '' && (
              <TouchableOpacity
                onPress={() => this.openUrl(review.link_1)}
                style={styles.links}
              >
                <Icon name="link" rotate={-40} style={styles.linkIcon} />
                <Text style={styles.text}>
                  {review.link_1}
                </Text>
              </TouchableOpacity>
            )}
            {review.link_2 !== '' && (
              <TouchableOpacity
                onPress={() => this.openUrl(review.link_2)}
                style={[
                  styles.links,
                  styles.link_2,
                ]}
              >
                <Icon name="link" rotate={-40} style={styles.linkIcon} />
                <Text
                  style={styles.text}
                >
                  {review.link_2}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.mapWrapper}>
            <Map
              ref={(ref) => { this._map = ref; }}
              onMapReady={this.onMapReady}
            >
              <Marker place={place} />
            </Map>
            <View style={styles.addressWrapper} onLayout={this.onAddressLayout}>
              <Icon style={styles.addressIcon} name="location-on" />
              <Text style={styles.addressText}>
                {place.address}
              </Text>
            </View>
          </View>
        </ScrollView>
        <Button light style={styles.actionButton} onPress={this.addOrEditReview}>
          <Text>{isOwn(review.user_type) ? 'Edit My Review' : 'Add Review'}</Text>
        </Button>
      </LayoutView>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { reviewId } = props.navigation.state.params;
  const review = selectFullReview(state, reviewId);

  return {
    review,
    place: state.entities.places[review.place],
  };
};

export default connect(mapStateToProps)(ReviewDetails);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
  },
  actionButton: {
    elevation: 8,
  },
  headerButton: {
    color: colors.green,
    fontSize: 24,
  },
  content: {
    minHeight: sizes.height - sizes.toolbarHeight - 48,
    backgroundColor: colors.white,
  },
  infoWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  review: {
    paddingTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    flex: 0,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
  },
  information: {
    marginTop: 12,
  },
  links: {
    flexDirection: 'row',
    marginTop: 22,
  },
  link_2: {
    marginTop: 12,
  },
  linkIcon: {
    fontSize: 24,
    color: colors.grey,
    marginRight: 4,
  },
  mapWrapper: {
    height: 178,
  },
  addressWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.whiteTransparent,
  },
  addressIcon: {
    fontSize: 14,
    color: colors.grey,
  },
  addressText: {
    fontSize: 10,
    marginLeft: 8,
  },
});
