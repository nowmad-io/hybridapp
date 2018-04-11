import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Animated, PanResponder, View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import _ from 'lodash';

import Entry from './entry';

import { sizes, carousel } from '../../parameters';

export default class carouselXY extends PureComponent {
  static propTypes = {
    navigation: PropTypes.object,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    data: PropTypes.array,
    onLevelChange: PropTypes.func,
    onIndexChange: PropTypes.func,
    onHeaderPress: PropTypes.func,
    panY: PropTypes.object,
  };

  static valueToLevel(value) {
    return value === carousel.level1 ? 1 : value === carousel.level2 ? 2 : 3;
  }

  constructor(props) {
    super(props);

    this.state = {
      data: props.data || [],
      buttonsHeight: 0,
      carouselEnabled: true,
    };
  }

  componentWillMount() {
    this._responder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (__, { dx, dy }) => {
        const dx2 = dx * dx;
        const dy2 = dy * dy;
        return !(dx2 > dy2);
      },
      onPanResponderGrant: () => {
        this.setState({ carouselEnabled: false });
        const offset = this.props.panY._value + this.props.panY._offset + this.state.buttonsHeight;
        this.props.panY.setOffset(offset);
        this.props.panY.setValue(-this.state.buttonsHeight);
      },
      onPanResponderMove: (__, { dy }) => {
        const { panY } = this.props;
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
        const { panY } = this.props;
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

  componentDidMount() {
    this.props.onIndexChange(this.props.data[0]);
  }

  componentWillReceiveProps({ data }) {
    if (data && !_.isEqual(data, this.props.data)) {
      const currentEntry = this.state.data[this._carousel.currentIndex];
      const index = data.findIndex(d => d.id === currentEntry.id);
      const newData = index !== -1 ?
        [currentEntry, ..._.filter(data, d => d.id === currentEntry.id)] : data;

      this.setState({ data: newData }, () => {
        this.goToIndex(0, false);
        this.props.onIndexChange(newData[0]);
      });
    }
  }

  onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ buttonsHeight: height });
    this.props.panY.setValue(this.props.panY._value - height);
  }

  _onIndexChange = (index) => {
    this.props.onIndexChange(this.state.data[index]);
  }

  levelToValue(level) {
    const value = level === 1 ?
      carousel.level1 : level === 2 ? carousel.level2 : carousel.level3;
    return -(value + this.state.buttonsHeight);
  }

  goToLevel = (level) => {
    Animated.timing(this.props.panY, {
      duration: 200,
      toValue: this.levelToValue(level),
    }).start();
  }

  goToIndex(index, animated = true) {
    this._carousel.snapToItem(index, animated);
  }

  goToEntry(place, animated = true) {
    const index = this.state.data.findIndex(d => d.id === place.id);

    if (index !== -1) {
      this._carousel.snapToItem(index, animated);
    }
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
    const { panY } = this.props;
    const { carouselEnabled, data } = this.state;

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
          onSnapToItem={this._onIndexChange}
          activeSlideOffset={1}
          swipeThreshold={1}
          lockScrollWhileSnapping
          decelerationRate="fast"
          activeAnimationType="decay"
          callbackOffsetMargin={10}
          scrollEnabled={carouselEnabled}
        />
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
