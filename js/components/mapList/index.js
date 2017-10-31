import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import { Icon } from 'native-base';

import PanController from './panController';
import Entry from './entry';

import styles, { SNAP_WIDTH, ITEM_PREVIEW_HEIGHT, BREAKPOINT1, BREAKPOINT2, TOOLBARHEIGHT, screen } from './styles';

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

class MapList extends Component {
  static propTypes = {
    places: PropTypes.array,
  }

  static defaultProps = {
    places: []
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

    const animations = props.places.map((m, i) =>
      getMarkerState(panX, panY, scrollY, i));

    this.state = {
      panX,
      panY,
      animations,
      index: 0,
      scrollY,
      scrollX,
      translateY
    };
  }

  componentDidMount() {
    const { panX, panY, scrollX } = this.state;
    const { places } = this.props;

    panX.addListener(this.onPanXChange);
    panY.addListener(this.onPanYChange);
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

  onPanXChange = ({ value }) => {
    const { index } = this.state;
    const newIndex = Math.floor(((-1 * value) + (SNAP_WIDTH / 2)) / SNAP_WIDTH);
    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  }

  onPanYChange = ({ value }) => {
    // const { canMoveHorizontal } = this.state;
    // const shouldBeMovable = Math.abs(value) < 2;
    // if (shouldBeMovable !== canMoveHorizontal) {
    //   this.setState({ canMoveHorizontal: shouldBeMovable });
    // }
  }

  render() {
    const { panX, panY, animations, translateY, scrollY } = this.state;
    const { places } = this.props;

    return (
      <View style={styles.container}>
        <PanController
          style={styles.container}
          vertical
          horizontal={true}
          xMode="snap"
          snapSpacingX={SNAP_WIDTH}
          yBounds={[-1 * screen.height, -BREAKPOINT2 , 0]}
          xBounds={[-screen.width * (places.length - 1), null, 0]}
          panY={panY}
          panX={panX}
          onStartShouldSetPanResponder={this.onStartShouldSetPanResponder}
          onMoveShouldSetPanResponder={this.onMoveShouldSetPanResponder}
        >
          <Animated.View style={[styles.itemContainer, {
            transform: [
              { translateY },
            ],
          }]}>
            {places.map((place, i) => {
              const {
                translateX,
              } = animations[i];
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
                    index={i}
                    scrollY={scrollY}
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

module.exports = MapList;
