import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, View, StyleSheet } from 'react-native';
import SnapCarousel from 'react-native-snap-carousel';
import _ from 'lodash';

import Entry from '../../dumbs/entry';

import { placeSelect } from '../../../actions/home';
import { selectVisiblePlaces } from '../../../reducers/home';

import { sizes, carousel } from '../../../parameters';

class Carousel extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    visiblePlaces: PropTypes.array,
    selectedPlace: PropTypes.object,
    panY: PropTypes.object,
  };

  componentDidMount() {
    this.goToIndex(0);
  }

  componentWillReceiveProps({ selectedPlace }) {
    if (!_.isEqual(this.props.selectedPlace, selectedPlace)) {
      const index = selectedPlace ?
        this.props.visiblePlaces.findIndex(d => d.id === selectedPlace.id) : 0;
      this.goToIndex(index, false);
    }
  }

  _onIndexChange = (index) => {
    this.props.dispatch(placeSelect(this.props.visiblePlaces[index]));
  }

  _onLayout = () => {
    const index = this.props.selectedPlace ?
      this.props.visiblePlaces.findIndex(place => place.id === this.props.selectedPlace.id) : 0;

    if (index !== -1) {
      this.goToIndex(index, false, false);
    } else {
      this.goToIndex(0);
    }
  }

  show = () => {
    Animated.timing(this.props.panY, {
      duration: 200,
      toValue: -carousel.level2,
    }).start();
  }

  hide = () => {
    Animated.timing(this.props.panY, {
      duration: 200,
      toValue: -carousel.level1,
    }).start();
  }

  goToIndex(index, triggerCallBack = true, animated = true) {
    this._carousel.snapToItem(index, animated, triggerCallBack);
  }

  _renderItem = ({ item }) => (
    <View style={styles.entryWrapper}>
      <Entry
        place={item}
        styles={styles.entry}
        navigation={this.props.navigation}
      />
    </View>
  )

  render() {
    const { panY, visiblePlaces } = this.props;

    return (
      <Animated.View
        style={[
          styles.carousel,
          { transform: [{ translateY: panY }] },
        ]}
      >
        <SnapCarousel
          ref={(c) => { this._carousel = c; }}
          data={visiblePlaces}
          renderItem={this._renderItem}
          sliderWidth={carousel.sliderWidth}
          itemWidth={carousel.itemWidth}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onSnapToItem={this._onIndexChange}
          activeSlideOffset={1}
          swipeThreshold={1}
          lockScrollWhileSnapping
          decelerationRate="fast"
          activeAnimationType="decay"
          onLayout={this._onLayout}
          callbackOffsetMargin={10}
        />
      </Animated.View>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  visiblePlaces: selectVisiblePlaces(state),
  selectedPlace: state.home.selectedPlace,
});

export default connect(mapStateToProps, bindActions, null, { withRef: true })(Carousel);

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    top: sizes.height,
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 14,
    width: sizes.width,
  },
  entryWrapper: {
    paddingHorizontal: carousel.itemSpacing / 2,
    width: carousel.itemWidth,
  },
  entry: {
    width: carousel.itemWidth - carousel.itemSpacing,
  },
});
