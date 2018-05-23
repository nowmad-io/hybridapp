import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, View, StyleSheet } from 'react-native';
import _ from 'lodash';

import Entry from '../../dumbs/entry';
import PanController from '../../dumbs/panController';

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

  componentWillReceiveProps({ selectedPlace }) {
    if (!_.isEqual(this.props.selectedPlace, selectedPlace)) {
      const index = selectedPlace ?
        this.props.visiblePlaces.findIndex(d => d.id === selectedPlace.id) : 0;
      this.goToIndex(index);
    }
  }

  _onIndexChange = (index) => {
    this.props.dispatch(placeSelect(this.props.visiblePlaces[index]));
  }

  _onLayout = () => {
    const index = this.props.selectedPlace ?
      this.props.visiblePlaces.findIndex(place => place.id === this.props.selectedPlace.id) : 0;

    if (index !== -1) {
      this.goToIndex(index);
    } else {
      this.goToIndex(0);
    }
  }

  show = () => {
    Animated.timing(this.props.panY, {
      duration: 200,
      toValue: -carousel.level2,
      useNativeDriver: true,
    }).start();
  }

  hide = () => {
    Animated.timing(this.props.panY, {
      duration: 200,
      toValue: -carousel.level1,
      useNativeDriver: true,
    }).start();
  }

  goToIndex(index) {
    this._carousel.toIndex(index);
  }

  _renderItem = ({ item }) => (
    <View style={styles.entryWrapper} key={item.id}>
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
      <PanController
        ref={(c) => { this._carousel = c; }}
        style={styles.carousel}
        horizontal
        lockDirection
        xBounds={[-sizes.width * (visiblePlaces.length - 1), null, 0]}
        data={visiblePlaces}
        panY={panY}
        renderItem={this._renderItem}
        onIndexChange={this._onIndexChange}
      />
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
    paddingRight: carousel.itemSpacing / 2,
    width: carousel.itemWidth,
  },
  entry: {
    width: carousel.itemWidth - carousel.itemSpacing,
  },
});
