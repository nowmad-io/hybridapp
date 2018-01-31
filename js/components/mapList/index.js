import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import _ from 'lodash';

import PanController from '../dumbs/panController';
import Entry from './entry';

import styles, { SNAP_WIDTH, LEVEL1, LEVEL2, LEVEL3 } from './styles';
import { sizes } from '../../parameters';

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
    const panY = new Animated.Value(LEVEL1);

    this.state = {
      panX,
      panY
    };
  }

  componentDidMount() {}

  componentWillReceiveProps({ places }) {
    if (places && this.props.places && !_.isEqual(places, this.props.places)) {}
  }

  onShouldSetPanResponder = (e) => {
    // set to false when scrolling on 3 level
    return true;
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
    const { panX, panY, animations } = this.state;
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
          xBounds={[-sizes.width * (places.length - 1), null, 0]}
          panY={panY}
          panX={panX}
          onStartShouldSetPanResponder={this.onShouldSetPanResponder}
          onMoveShouldSetPanResponder={this.onShouldSetPanResponder}
          onIndexChange={this.onIndexChange}
          onLevelChange={this.onLevelChange}
        >
          <Animated.View style={[styles.itemContainer, {
            transform: [
              { translateY: panY },
            ],
          }]}>
            {places.map((place, i) => {
              return (
                <Animated.View
                  key={place.id}
                  style={[styles.item, {
                    transform: [
                      { translateX: panX },
                    ],
                  }]}
                >
                  <Entry
                    place={place}
                    scrollY={panY}
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
