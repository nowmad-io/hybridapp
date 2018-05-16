import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, PanResponder, View, StyleSheet } from 'react-native';
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
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array,
    ]),
    visiblePlaces: PropTypes.array,
    selectedPlace: PropTypes.object,
    onLevelChange: PropTypes.func,
    onIndexChange: PropTypes.func,
    onHeaderPress: PropTypes.func,
    panY: PropTypes.object,
    defaultEntry: PropTypes.object,
  };

  static valueToLevel(value) {
    return value === carousel.level1 ? 1 : value === carousel.level2 ? 2 : 3;
  }

  constructor(props) {
    super(props);

    this.state = {
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
          this.props.onLevelChange(Carousel.valueToLevel(toValue));
        });
      },
    });
  }

  componentDidUpdate({ selectedPlace, visiblePlaces }) {
    console.log('componentDidUpdate ?', this.props.selectedPlace, selectedPlace);
    console.log('componentDidUpdate visiblePlaces', this.props.visiblePlaces, visiblePlaces);
    if (!_.isEqual(this.props.selectedPlace, selectedPlace)
      || !_.isEqual(this.props.visiblePlaces, visiblePlaces)) {
      const index = this.props.visiblePlaces.findIndex(d => d.id === this.props.selectedPlace.id);
      console.log('index', index)
      console.log('this._carousel.currentIndex', this._carousel.currentIndex)
      console.log('this._carousel.currentScrollPosition', this._carousel.currentScrollPosition)
      // this._carousel.snapToItem(0, false, false);
      if (index !== -1 && index !== this._carousel.currentIndex) {
        console.log('this.goToIndex(index);')
        this.goToIndex(index);
      } else if (index === -1) {
        console.log('this.goToIndex(0);')
        this.goToIndex(0);
      }
    }
  }

  onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ buttonsHeight: height });
    this.props.panY.setValue(this.props.panY._value - height);
  }

  _onIndexChange = (index) => {
    console.log('_onIndexChange ?');
    this.props.dispatch(placeSelect(this.props.visiblePlaces[index]));
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
    const index = this.props.visiblePlaces.findIndex(d => d.id === place.id);

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
      />
    </View>
  )

  render() {
    const { panY, visiblePlaces } = this.props;
    const { carouselEnabled } = this.state;

    return (
      <Animated.View
        {...this._responder.panHandlers}
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
          callbackOffsetMargin={10}
          scrollEnabled={carouselEnabled}
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
