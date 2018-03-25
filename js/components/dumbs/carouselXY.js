import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import Entry from './entry';

import { sizes, carousel } from '../../parameters';

export default class carouselXY extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
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
  };

  static valueToLevel(value) {
    return value === carousel.level1 ? 1 : value === carousel.level2 ? 2 : 3;
  }

  constructor(props) {
    super(props);

    this.state = {
      buttonsHeight: 0,
      panY: new Animated.Value(-carousel.level1),
      carouselEnabled: true,
    };
  }

  componentWillMount() {
    this._responder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (_, { dx, dy }) => {
        const dx2 = dx * dx;
        const dy2 = dy * dy;
        return !(dx2 > dy2);
      },
      onPanResponderGrant: () => {
        this.setState({ carouselEnabled: false });
        const offset = this.state.panY._value + this.state.panY._offset + this.state.buttonsHeight;
        this.state.panY.setOffset(offset);
        this.state.panY.setValue(-this.state.buttonsHeight);
      },
      onPanResponderMove: (_, { dy }) => {
        const { panY } = this.state;
        let val = -panY._offset - dy;

        if (val > carousel.level3) {
          val = carousel.level3;
        }
        if (val < carousel.level1) {
          val = carousel.level1;
        }

        val += panY._offset;
        panY.setValue(-val - this.state.buttonsHeight);
      },
      onPanResponderRelease: (e, { dy }) => {
        const { panY } = this.state;
        const value = -panY._offset - dy;
        const min = carousel.level1;
        const step = carousel.level2;
        const max = carousel.level3;
        const ratio = (dy < 0) ? (1 / 8) : (7 / 8);
        let toValue = min;

        panY.flattenOffset();

        if ((value < step && value < min + (step - min) * ratio)) {
          toValue = min;
        } else if ((value > step && value > step + (max - step) * ratio)) {
          toValue = max;
        } else if ((value > step && value < step + (max - step) * ratio)
          || (value < step && value > min + (step - min) * ratio)) {
          toValue = step;
        }

        Animated.timing(panY, {
          duration: 200,
          toValue: -toValue - this.state.buttonsHeight,
        }).start(() => {
          this.setState({ carouselEnabled: true });
          this.props.onLevelChange(carouselXY.valueToLevel(toValue));
        });
      },
    });
  }

  onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ buttonsHeight: height });
    this.state.panY.setValue(this.state.panY._value - height);
  }

  levelToValue(level) {
    const value = level === 1 ?
      carousel.level1 : level === 2 ? carousel.level2 : carousel.level3;
    return -(value + this.state.buttonsHeight);
  }

  goToLevel = (level) => {
    Animated.timing(this.state.panY, {
      duration: 200,
      toValue: this.levelToValue(level),
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
        panY={this.state.panY}
        min={carousel.level1}
        step={carousel.level2}
        max={carousel.level3}
      />
    </View>
  )

  render() {
    const { children, data, onIndexChange } = this.props;
    const { panY, carouselEnabled } = this.state;

    return (
      <Animated.View
        style={[
          styles.carousel,
          { transform: [{ translateY: panY }] },
        ]}
      >
        <View style={styles.buttonWrapper} onLayout={this.onLayout} pointerEvents="box-none">
          { children }
        </View>
        <View {...this._responder.panHandlers}>
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
            scrollEnabled={carouselEnabled}
          />
        </View>
      </Animated.View>
    );
  }
}

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
    padding: 16,
    width: carousel.itemWidth,
  },
  entryWrapper: {
    paddingHorizontal: carousel.itemSpacing / 2,
    width: carousel.itemWidth,
  },
  entry: {
    width: carousel.itemWidth - carousel.itemSpacing,
  },
});
