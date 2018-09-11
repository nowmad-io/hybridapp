import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import memoize from 'fast-memoize';

import { selectReview } from '../../reducers/entities';
import Avatar from './avatar';

import { colors, userTypes } from '../../parameters';

const triangleHelper = 10;

class Marker extends PureComponent {
  static propTypes = {
    selected: PropTypes.bool,
    onMarkerPress: PropTypes.func,
    place: PropTypes.object,
    review: PropTypes.object,
  };

  static defaultProps = {
    onMarkerPress: () => true,
  }

  onMarkerPress = () => {
    this.props.onMarkerPress(this.props.place);
  }

  render() {
    const {
      place: {
        reviews, latitude, longitude,
      },
      selected,
      review,
    } = this.props;
    let text = '';

    if (reviews && reviews.length > 1) {
      text = reviews.length;
    } else if (review && review.user_type !== userTypes.google) {
      text = review.user_type === userTypes.me ? 'me' : `${review.created_by.first_name[0]}${review.created_by.last_name[0]}`;
    }

    const avatarSize = (text === 'me') ? 36 : 40;
    const height = !selected
      ? (avatarSize + triangleHelper - 1) : (avatarSize + 2 * (triangleHelper + 1));

    return (
      <MapView.Marker
        coordinate={{ latitude, longitude }}
        onPress={this.onMarkerPress}
        anchor={{ x: 0.5, y: 1 }}
      >
        <View
          style={[
            styles.wrapper,
            { height },
            selected && styles.wrapper_selected,
            selected && { width: height },
          ]}
        >
          <Avatar
            size={avatarSize}
            text={text}
            set="FontAwesome"
            icon={!review || review.user_type === userTypes.google ? 'google' : ''}
            uppercase={(text !== 'me')}
            style={selected && styles.avatar_selected}
            textStyle={markerAvatar(selected, text === 'me')}
          />
          <View
            style={[
              styles.triangle,
              selected && styles.triangle_selected,
            ]}
          />
        </View>
      </MapView.Marker>
    );
  }
}

const makeMapStateToProps = () => {
  const reviewSelector = selectReview();

  return (state, props) => {
    const { place: { reviews } } = props;

    return {
      review: reviews && reviewSelector(state, reviews[0]),
    };
  };
};

export default connect(makeMapStateToProps)(Marker);

const markerAvatar = memoize((selected, me) => [
  selected && styles.avatar_text_selected,
  me && styles.avatarMe,
]);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  wrapper_me: {
    backgroundColor: 'transparent',
  },
  wrapper_selected: {
    justifyContent: 'center',
    backgroundColor: colors.greenShadow,
    borderRadius: 50,
  },
  avatar_selected: {
    backgroundColor: colors.green,
    borderColor: colors.white,
  },
  avatar_text_selected: {
    color: colors.white,
  },
  avatarMe: {
    fontSize: 18,
    lineHeight: 20,
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    borderTopWidth: triangleHelper,
    borderRightWidth: triangleHelper / 2.0,
    borderBottomWidth: 0,
    borderLeftWidth: triangleHelper / 2.0,
    borderTopColor: colors.green,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    zIndex: 2,
  },
  triangle_selected: {
    bottom: 2,
    borderTopColor: colors.white,
  },
  triangle_green: {
    borderTopColor: colors.green,
  },
});
