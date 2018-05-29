import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, View, StyleSheet } from 'react-native';
import _ from 'lodash';

import Entry from '../../dumbs/entry';
import PanController from '../../dumbs/panController';

import { placeSelect } from '../../../actions/home';
import { selectVisiblePlaces } from '../../../reducers/home';

import { sizes, carousel } from '../../../parameters';

class Carousel extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    visiblePlaces: PropTypes.array,
    selectedPlace: PropTypes.object,
    gPlace: PropTypes.object,
    panY: PropTypes.object,
    hidden: PropTypes.bool,
  };

  static defaultProps = {
    hidden: false,
  }

  constructor(props) {
    super(props);

    this._carousel = React.createRef();
  }

  componentWillReceiveProps({ selectedPlace, visiblePlaces, hidden }) {
    if (!_.isEqual(this.props.selectedPlace, selectedPlace)) {
      const index = selectedPlace
        ? _.compact([this.props.gPlace, ...this.props.visiblePlaces])
          .findIndex(d => d.id === selectedPlace.id)
        : 0;
      this.goToIndex(index);
    }

    if (!hidden && this.props.hidden) {
      this.toggleVisibility(this.props.visiblePlaces.length || this.props.gPlace);
    }

    if (!this.props.hidden) {
      if ((this.props.visiblePlaces.length && !visiblePlaces.length && !this.props.gPlace)
        || hidden) {
        this.toggleVisibility(false, hidden);
      } else if (!this.props.visiblePlaces.length && visiblePlaces.length || this.props.gPlace) {
        this.toggleVisibility(true);
      }
    }
  }

  shouldComponentUpdate({ visiblePlaces, gPlace }) {
    return (
      !_.isEqual(visiblePlaces, this.props.visiblePlaces)
      || !_.isEqual(gPlace, this.props.gPlace)
    );
  }

  _onIndexChange = (index) => {
    const { visiblePlaces, gPlace } = this.props;
    this.props.dispatch(placeSelect((gPlace && !index)
      ? gPlace
      : visiblePlaces[index - (gPlace ? '1' : 0)]));
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

  _onCarouselDidUpdate = () => {
    const { selectedPlace, visiblePlaces, gPlace } = this.props;
    const index = (selectedPlace && selectedPlace.id)
      ? _.compact([gPlace, ...visiblePlaces]).findIndex(d => d.id === selectedPlace.id)
      : -1;

    this._carousel.current.toIndex(index, index < 0, index < 0);
  }

  toggleVisibility = (visible = true, half = false) => {
    Animated.timing(this.props.panY, {
      duration: 200,
      toValue: visible ? -carousel.level2 : half ? -carousel.level1 : 0,
      useNativeDriver: true,
    }).start();
  }

  goToIndex(index) {
    this._carousel.current.toIndex(index);
  }

  render() {
    const { panY, visiblePlaces, gPlace } = this.props;
    return (
      <PanController
        ref={this._carousel}
        style={styles.carousel}
        horizontal
        lockDirection
        panY={panY}
        onIndexChange={this._onIndexChange}
        onComponentDidUpdate={this._onCarouselDidUpdate}
      >
        {gPlace && (
          <View
            style={styles.entryWrapper}
          >
            <Entry
              place={gPlace}
              styles={styles.entry}
              navigation={this.props.navigation}
            />
          </View>
        )}
        {visiblePlaces && visiblePlaces.map(place => (
          <View
            key={place.id}
            style={styles.entryWrapper}
          >
            <Entry
              place={place}
              styles={styles.entry}
              navigation={this.props.navigation}
            />
          </View>
        ))}
      </PanController>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  visiblePlaces: selectVisiblePlaces(state),
  selectedPlace: state.home.selectedPlace,
  gPlace: state.home.gPlace,
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
