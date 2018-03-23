import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Entry from './entry';

import { sizes, carousel } from '../../parameters';

export default class carouselXY extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    selectedPlace: PropTypes.object,
    data: PropTypes.array,
    onLevelChange: PropTypes.func,
    onIndexChange: PropTypes.func,
    onHeaderPress: PropTypes.func,
    panY: PropTypes.any,
  };

  static defaultProps = {
    panY: new Animated.Value(0),
  }

  static valueToLevel(value) {
    return value === 0 ? 1 : value === carousel.level2 ? 2 : 3;
  }

  static levelToValue(level) {
    return level === 1 ? 0 : level === 2 ? carousel.level2 : carousel.level3;
  }

  componentWillMount() {
    this._responder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, { dx, dy }) => {
        const dx2 = dx * dx;
        const dy2 = dy * dy;
        return !(dx2 > dy2);
      },
      onPanResponderGrant: () => {
        this.props.panY.setOffset(this.props.panY._value + this.props.panY._offset);
        this.props.panY.setValue(0);
      },
      onPanResponderMove: (_, { dy }) => {
        const { panY } = this.props;
        let val = panY._offset + dy;

        if (val < carousel.level3) {
          val = carousel.level3;
        }
        if (val > 0) {
          val = 0;
        }

        val -= panY._offset;
        panY.setValue(val);
      },
      onPanResponderRelease: (e, { dy }) => {
        const { panY } = this.props;
        const value = panY._offset + dy;
        const min = 0;
        const step = carousel.level2;
        const max = carousel.level3;
        const ratio = (dy < 0) ? (1 / 8) : (7 / 8);
        let toValue = min;

        panY.flattenOffset();

        if ((value > min) || (value > step && value > min + (step - min) * ratio)) {
          toValue = min;
        } else if ((value < max) || (value < step && value < step + (max - step) * ratio)) {
          toValue = max;
        } else if ((value < step && value > step + (max - step) * ratio)
          || (value > step && value < min + (step - min) * ratio)) {
          toValue = step;
        }

        Animated.timing(panY, {
          duration: 200,
          toValue,
        }).start(() => this.props.onLevelChange(carouselXY.valueToLevel(toValue)));
      },
    });
  }

  _listener: null;

  goToLevel = (level) => {
    Animated.timing(this.props.panY, {
      duration: 200,
      toValue: carouselXY.levelToValue(level),
    }).start();
  }

  goToIndex(index, animated = true) {
    this._carousel.snapToItem(index, animated);
  }

  _renderItem = ({ item }) => (
    <View style={styles.entryWrapper}>
      <Entry
        place={item}
        styles={styles.entry}
        onHeaderPress={this.props.onHeaderPress}
        navigation={this.props.navigation}
        panY={this.props.panY}
        min={carousel.level1}
        step={carousel.level2}
        max={carousel.level3}
      />
    </View>
  )

  render() {
    const { data, onIndexChange, panY } = this.props;

    return (
      <Animated.View
        {...this._responder.panHandlers}
        style={[
          styles.carousel,
          { transform: [{ translateY: panY }] },
        ]}
      >
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={carousel.sliderWidth}
          itemWidth={carousel.itemWidth}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          onSnapToItem={onIndexChange}
          activeSlideOffset={1}
          swipeThreshold={1}
          lockScrollWhileSnapping
          decelerationRate="fast"
          activeAnimationType="decay"
          callbackOffsetMargin={10}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    position: 'absolute',
    top: sizes.height + carousel.level1 - carousel.border,
  },
  entryWrapper: {
    paddingHorizontal: carousel.itemSpacing / 2,
    width: carousel.itemWidth,
  },
  entry: {
    width: carousel.itemWidth - carousel.itemSpacing,
  },
});
