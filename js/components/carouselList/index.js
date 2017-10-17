import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

import GestureRecognizer from '../swipeGestures';
import Entry from './entry';

import styles, { sliderWidth, itemWidth } from './styles';

class CarouselList extends Component {
  static propTypes = {
    data: PropTypes.array,
    customStyle: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      carouselHeight: ['20%', '40%', '100%'],
      level: 0
    }
  }

  onSwipeUp() {
    if (this.state.level >= 2) {
      return;
    }

    console.log('here ?!', this.state.level);
    this.setState({level: this.state.level + 1})
  }

  onSwipeDown() {
    if (this.state.level <= 0) {
      return;
    }

    this.setState({level: this.state.level - 1})
  }

  _renderItem ({item, index}) {
    return (
      <Entry data={item} />
    );
  }

  render() {
    const { carouselHeight, level } = this.state;

    return (
      <GestureRecognizer
        onSwipeUp={() => this.onSwipeUp()}
        onSwipeDown={() => this.onSwipeDown()}
        velocityThreshold={1}
        style={{...styles.carouselWrapper, height: carouselHeight[level]}}
      >
        <Carousel
          ref={(c) => {this._carousel = c;}}
          data={this.props.data}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.carousel}
        />
      </GestureRecognizer>
    );
  }
}

export default CarouselList;
