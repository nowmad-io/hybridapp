import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import { selectReview, selectUser } from '../../reducers/entities';
import Avatar from '../dumbs/avatar';

import { colors } from '../../parameters';

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
    } else if (review) {
      text = review.user_type === 'me' ? 'me' : `${review.created_by.first_name[0]}${review.created_by.last_name[0]}`;
    }

    const avatarSize = (text === 'me') ? 46 : 40;
    const height = !selected ?
      (avatarSize + triangleHelper - 1) : (avatarSize + 2 * (triangleHelper + 1));

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
            uppercase={(text !== 'me')}
            style={[
              selected && styles.avatar_selected,
            ]}
            textStyle={[
              selected && styles.avatar_text_selected,
            ]}
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

const mapStateToProps = (state, props) => {
  const { place: { reviews } } = props;

  if (!reviews || !reviews.length) {
    return {};
  }

  const review = selectReview(reviews[0])(state);

  return {
    review: {
      ...review,
      created_by: review && selectUser(review.created_by)(state),
    },
  };
};

export default connect(mapStateToProps)(Marker);

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
