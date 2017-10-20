import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';
import MapView from 'react-native-maps';
import { Thumbnail } from 'native-base';
import _ from 'lodash';

import styles from './styles';

class Marker extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    place: PropTypes.object,
    me: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      type: this.getPlaceType(props.place),
      friendsCount: props.place.reviews.length
    };
  }

  getPlaceType(place) {
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
      <View style={_styles.wrapper}>
        <View style={_styles.shadow}>
          <View style={_styles.thumbnailWrapper}>
            {friendsCount > 1 ? (
              <Text style={_styles.count}>{friendsCount}</Text>
            ) : (
              <Thumbnail small source={{uri: place.reviews[0].created_by.picture}} />
            )}
          </View>
        </View>
        <View style={_styles.triangle}/>
      </View>
    )
  }
}

export default Marker;
