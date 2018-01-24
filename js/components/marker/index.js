import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { Thumbnail } from 'native-base';
import _ from 'lodash';

import Text from '../dumbs/text';

import styles from './styles';

class Marker extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    place: PropTypes.object,
    onMarkerPress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      type: this.getPlaceType(props.place),
      friendsCount: props.place.reviews && props.place.reviews.length || 0
    };
  }

  getPlaceType(place) {
    if (!place.reviews) {
      return 'new';
    }

    const types = _.uniq(place.reviews.map((review, index) => {
        return review.user_type;
    }));

    return (types.length === 1) ? types[0] : null;
  }

  render() {
    const { selected, place } = this.props;
    const { type, friendsCount } = this.state;
    const _styles = styles(selected, type);

    return (
      <MapView.Marker
        coordinate={{latitude: place.latitude, longitude: place.longitude}}
        onPress={(e) => this.props.onMarkerPress(e, place)}
      >
        <View style={styles(selected, type).wrapper}>
          <View style={styles(selected, type).shadow}>
            <View style={styles(selected, type).thumbnailWrapper}>
              {friendsCount > 1 ? (
                <Text style={styles(selected, type).count}>{friendsCount}</Text>
              ) : (type !== 'new') && (
                <Thumbnail small source={{uri: place.reviews[0].created_by.picture}} />
              )}
            </View>
          </View>
          <View style={styles(selected, type).triangle}/>
        </View>
      </MapView.Marker>
    )
  }
}

Map.defaultProps = {
  onMarkerPress: () => {}
}

export default Marker;
