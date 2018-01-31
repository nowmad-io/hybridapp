import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import _ from 'lodash';

import PanController from './panController';
import Entry from './entry';

import styles, { SNAP_WIDTH, ITEM_PREVIEW_HEIGHT, BREAKPOINT1, BREAKPOINT2, TOOLBARHEIGHT, screen } from './styles';

const LEVEL1 = 0,
      LEVEL2 = -BREAKPOINT2,
      LEVEL3 = -1 * screen.height;

function getMarkerState(panX, panY, scrollY, i) {
  const xLeft = (-SNAP_WIDTH * i) + (SNAP_WIDTH / 2);
  const xRight = (-SNAP_WIDTH * i) - (SNAP_WIDTH / 2);
  const xPos = -SNAP_WIDTH * i;

  const isIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const translateY = Animated.multiply(isIndex, panY);

  const translateX = panX;

  const anim = Animated.multiply(isIndex, scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  }));

  return {
    translateY,
    translateX,
    anim
  };
}

export default class MapList extends Component {
  static propTypes = {
    places: PropTypes.array,
    navigation: PropTypes.object,
    index: PropTypes.number,
    onIndexChange: PropTypes.func,
    onLevelChange: PropTypes.func,
  }

  static defaultProps = {
    places: [],
    onIndexChange: () => {},
    onLevelChange: () => {}
  }

  constructor(props) {
    super(props);

    const panX = new Animated.Value(0);
    const panY = new Animated.Value(0);

    const scrollY = panY.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const scrollX = panX.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, -BREAKPOINT1],
      extrapolate: 'clamp',
    });

    this.state = {
      animations: [],
      panX,
      panY,
      scrollY,
      scrollX,
      translateY
    };
  }

  setUpAnimations(places) {
    const { panX, panY, scrollY } = this.state;
    const animations = places.map((m, i) =>
      getMarkerState(panX, panY, scrollY, i));

    this.setState({ animations });
  }

  componentDidMount() {
    const { panX, panY, scrollX } = this.state;
    const { places } = this.props;

    this.setUpAnimations(places);
  }

  componentWillReceiveProps({ places }) {
    if (places && this.props.places && !_.isEqual(places, this.props.places)) {
      this.setUpAnimations(places);
      this.goToIndex(0);
    }
  }

  onStartShouldSetPanResponder = (e) => {
    // we only want to move the view if they are starting the gesture on top
    // of the view, so this calculates that and returns true if so. If we return
    // false, the gesture should get passed to the map view appropriately.
    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT - panY.__getValue();
    const topOfTap = screen.height - pageY - TOOLBARHEIGHT;

    return topOfTap < topOfMainWindow;
  }

  onMoveShouldSetPanResponder = (e) => {
    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT - panY.__getValue();
    const topOfTap = screen.height - pageY - TOOLBARHEIGHT;

    return topOfTap < topOfMainWindow;
  }

  onIndexChange = (endX) => {
    const index = Math.floor(((-1 * endX) + (SNAP_WIDTH / 2)) / SNAP_WIDTH);

    this.props.onIndexChange(this.props.places[index]);
  }

  onLevelChange = (value) => {
    let level = 1;

    switch (value) {
      case LEVEL1:
        level = 1;
        break;
      case LEVEL2:
        level = 2;
        break;
      case LEVEL3:
        level = 3;
        break;
    }

    this.props.onLevelChange(level);
  }

  goToEntry(entry) {
    index = 0;
    this.props.places.some((place, i) => {
      if (place.id === entry.id) {
        index = i;
        return true;
      }
      return false;
    });

    this.goToIndex(index);
  }

  goToIndex(index) {
    const toValue = -index * SNAP_WIDTH;

    this.refs.panController.goToX(toValue);
  }


  render() {
    const { panX, panY, animations, translateY, scrollY } = this.state;
    const { places, navigation } = this.props;

    return (
      <View style={styles.container}>
        <PanController
          ref='panController'
          style={styles.container}
          vertical
          horizontal={true}
          xMode="snap"
          snapSpacingX={SNAP_WIDTH}
          yBounds={[LEVEL3, LEVEL2 , LEVEL1]}
          xBounds={[-screen.width * (places.length - 1), null, 0]}
          panY={panY}
          panX={panX}
          onStartShouldSetPanResponder={this.onStartShouldSetPanResponder}
          onMoveShouldSetPanResponder={this.onMoveShouldSetPanResponder}
          onIndexChange={this.onIndexChange}
          onLevelChange={this.onLevelChange}
        >
          <Animated.View style={[styles.itemContainer, {
            transform: [
              { translateY },
            ],
          }]}>
            {places.map((place, i) => {
              const translateX = animations && animations[i] ? animations[i].translateX : 0;

              return (
                <Animated.View
                  key={place.id}
                  style={[styles.item, {
                    transform: [
                      { translateX },
                    ],
                  }]}
                >
                  <Entry
                    place={place}
                    scrollY={scrollY}
                    navigation={navigation}
                  />
                </Animated.View>
              );
            })}
          </Animated.View>
        </PanController>
      </View>
    );
  }
}
