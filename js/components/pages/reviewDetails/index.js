import React, { Component } from 'react';
import {
  StyleSheet, View, ScrollView, BackHandler, TouchableOpacity, Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import LayoutView from '../../dumbs/layoutView';
import Button from '../../dumbs/button';
import Text from '../../dumbs/text';
import Map from '../../dumbs/map';
import Marker from '../../dumbs/marker';
import Icon from '../../dumbs/icon';
import Review from '../../dumbs/entry/review';

import { colors, sizes } from '../../../parameters';

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

  onMapReady = () => {
    const { place } = this.props.navigation.state.params;

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
      </LayoutView>
    );
  }
}


const styles = StyleSheet.create({
  content: {
    minHeight: sizes.height - sizes.toolbarHeight,
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
