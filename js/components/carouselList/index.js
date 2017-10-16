import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';

import Entry from './entry';

import { sliderWidth, itemWidth } from './styles';

class CarouselList extends Component {
  static propTypes = {
    data: PropTypes.array,
    customStyle: PropTypes.object,
  }

  _renderItem ({item, index}) {
    return (
      <Entry
        data={item}
        even={(index + 1) % 2 === 0}
      />
    );
  }

  render() {
    return (
      <Carousel
        ref={(c) => {this._carousel = c;}}
        data={this.props.data}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        containerCustomStyle={this.props.customStyle}
      />
    );
  }
}

export default CarouselList;
