import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'lodash';

import Text from '../dumbs/text';
import Thumbnail from '../dumbs/thumbnail';

import { colors } from '../../parameters';

export default class Marker extends PureComponent {
  static propTypes = {
    selected: PropTypes.bool,
    place: PropTypes.object,
    onMarkerPress: PropTypes.func,
  };

  static defaultProps = {
    onMarkerPress: () => true,
  }

  static getPlaceType(place) {
    if (!place.reviews) {
      return 'new';
    }

    const types = _.uniq(place.reviews.map(review => review.user_type));

    return (types.length === 1) ? types[0] : null;
  }

  constructor(props) {
    super(props);

    this.state = {
      type: Marker.getPlaceType(props.place),
      friendsCount: props.place.reviews && props.place.reviews.length || 0,
    };
  }

  render() {
    const { selected, place } = this.props;
    const { type, friendsCount } = this.state;

    return (
      <MapView.Marker
        coordinate={{ latitude: place.latitude, longitude: place.longitude }}
        onPress={() => this.props.onMarkerPress(place)}
        anchor={selected ? { x: 0.5, y: 0.91 } : { x: 0.5, y: 1 }}
      >

        <View style={[
          styles.wrapper,
          (type === 'me') && styles.wrapper_me,
          selected && styles.wrapper_selected,
        ]}
        >
          <View style={[
            styles.thumbnail,
            (selected || type === 'new') && (type !== 'me') && styles.thumbnail_selected,
          ]}
          >
            {friendsCount > 1 ? (
              <Text style={[
                styles.count,
                selected && styles.count_selected,
              ]}
              >
                {friendsCount}
              </Text>
            ) : (type !== 'new') && (
              <Thumbnail small source={{ uri: place.reviews[0].created_by.picture }} />
            )}
          </View>
          <View style={[
              styles.triangle,
              selected && styles.triangle_selected,
              (selected || type === 'new') && (type !== 'me') && styles.triangle_green,
            ]}
          />
        </View>
      </MapView.Marker>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 36,
    width: 36,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.greenShadow,
  },
  wrapper_me: {
    backgroundColor: 'transparent',
  },
  wrapper_selected: {
    height: 44,
    width: 44,
    backgroundColor: colors.greenShadow,
  },
  thumbnail: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail_selected: {
    backgroundColor: colors.green,
  },
  count: {
    color: colors.black,
  },
  count_selected: {
    color: colors.white,
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 6,
    borderRightWidth: 6 / 2.0,
    borderBottomWidth: 0,
    borderLeftWidth: 6 / 2.0,
    borderTopColor: colors.white,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    zIndex: 2,
  },
  triangle_selected: {
    bottom: 4,
  },
  triangle_green: {
    borderTopColor: colors.green,
  },
});
