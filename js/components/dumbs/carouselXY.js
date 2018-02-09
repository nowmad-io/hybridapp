import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Entry from './entry';

import { sizes } from '../../parameters';

export default class carouselXY extends Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ]),
    data: PropTypes.array,
    min: PropTypes.number,
    step: PropTypes.number,
    max: PropTypes.number
  };

  _listener: null;

  constructor(props) {
    super(props);

    this.state = {
      panY: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this._responder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, { dx, dy }) => {
        const dx2 = dx * dx;
        const dy2 = dy * dy;
        return dx2 > dy2 ? false : true;
      },
      onPanResponderGrant: (e, gestureState) => {
        this.state.panY.setOffset(this.state.panY._value + this.state.panY._offset);
        this.state.panY.setValue(0);
      },
      onPanResponderMove: (_, { dx, dy, x0, y0 }) => {
        let panY = this.state.panY,
            val = panY._offset + dy;

        if (val < this.props.max) {
          val = this.props.max;
        }
        if (val > 0) {
          val = 0;
        }

        val = val - panY._offset;
        panY.setValue(val);
      },
      onPanResponderRelease: (e, {dy, vx, vy}) => {
        let panY = this.state.panY,
            level = 1;
        const value = panY._offset + dy,
              min = 0,
              step = this.props.step,
              max = this.props.max;

        panY.flattenOffset();

        let toValue = min;

        if ((value > min) || (value > step && value > min + (step - min) / 2)) {
          toValue = min;
          level = 1;
        } else if ((value < max) || (value < step && value < step + (max - step) / 2 ) ) {
          toValue = max;
          level = 2;
        } else if ((value < step && value > step + (max - step) / 2)
          || (value > step && value < min + (step - min) / 2)) {
          toValue = step;
          level = 3;
        }

        Animated.timing(panY, {
          duration: 200,
          toValue
        }).start(() => this.props.onLevelChange(level));
      }
    });
  }

  _renderItem({item, index}) {
    return (
      <View style={styles.entryWrapper}>
        <Entry
          place={item}
          style={styles.entry}
        />
      </View>
    );
  }

  render() {
    const { data, onIndexChange, min, sliderWidth, itemWidth } = this.props;
    const { panY } = this.state;

    return (
      <Animated.View
        {...this._responder.panHandlers}
        style={[
          styles.carousel,
          {top: sizes.height + min},
          {transform: [{ translateY: panY }]}
        ]}
      >
        <Carousel
          data={data}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onSnapToItem={onIndexChange}
        />
      </Animated.View>
    );
  }
};

const SLIDER_WIDTH = sizes.width;
const ITEM_SPACING = 8;
const ITEM_WIDTH = sizes.width - ITEM_SPACING * 2;

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute'
  },
  entryWrapper: {
    paddingHorizontal: ITEM_SPACING / 2,
    width: ITEM_WIDTH
  },
  entry: {
    width: ITEM_WIDTH - ITEM_SPACING
  }
});
