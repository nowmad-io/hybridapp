import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import shortid from 'shortid';

import GestureRecognizer from '../swipeGestures';
import Entry from './entry';

import styles, { dimension, sliderWidth, itemWidth } from './styles';

class CarouselList extends Component {
  static propTypes = {
    data: PropTypes.array,
    customStyle: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      carouselTop: [dimension.height - 64 - 48, dimension.height - 256 - 48, 0 ], // 64, 256, 494
      level: 0
    }
  }

  onSwipeUp() {
    if (this.state.level >= 2) {
      return;
    }
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
      <Entry
        key={shortid.generate()}
        data={item}
        index={index}
      />
    );
  }

  render() {
    const { carouselTop, level } = this.state;
    console.log('carouselTop', carouselTop);
    return (
      <GestureRecognizer
        onSwipeUp={() => this.onSwipeUp()}
        onSwipeDown={() => this.onSwipeDown()}
        velocityThreshold={1}
        style={{...styles.carouselWrapper, top: carouselTop[level]}}
      >
        <Carousel
          ref={(c) => {this._carousel = c;}}
          data={this.props.data}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          containerCustomStyle={styles.carousel}
        />
      </GestureRecognizer>
    );
  }
}

export default CarouselList;
