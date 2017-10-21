import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import shortid from 'shortid';

import { selectedPlace } from '../../actions/home'
import GestureRecognizer from '../swipeGestures';
import Entry from './entry';

import styles, { dimension, sliderWidth, itemWidth } from './styles';

class CarouselList extends Component {
  static propTypes = {
    data: PropTypes.array,
    customStyle: PropTypes.object,
    selectedPlace: PropTypes.number,
    level: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = {
      carouselTop: [80, 232, dimension.height - 40 - 12 ],
      level: 0
    }
  }

  componentWillReceiveProps({ selectedPlace }) {
    if ( selectedPlace && this.carousel) {
      let placeIndex = 0;
      this.props.data.find(function(place, index) {
        if (place.id === selectedPlace) {
          placeIndex = index;
          return true;
        }
        return false;
      });
      this.carousel.snapToItem(placeIndex);
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

  onSnapToItem(selectedItem) {
    this.props.dispatch(selectedPlace(this.props.data[selectedItem].id));
  }

  _renderItem ({item, index}, carouselTop, level) {
    return (
      <Entry
        key={shortid.generate()}
        data={item}
        index={index}
        selected={item.id===this.props.selectedPlace}
        level={level}
      />
    );
  }

  render() {
    const { carouselTop, level } = this.state;
    return (
      <GestureRecognizer
        onSwipeUp={() => this.onSwipeUp()}
        onSwipeDown={() => this.onSwipeDown()}
        velocityThreshold={1}
        style={{...styles.carouselWrapper, top: dimension.height - 28 - carouselTop[level]}}
      >
        <Carousel
          ref={(c) => {this.carousel = c;}}
          data={this.props.data}
          renderItem={(data) => this._renderItem(data, carouselTop, level)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          containerCustomStyle={styles.carousel}
          onSnapToItem={(selectedItem) => this.onSnapToItem(selectedItem)}
        />
      </GestureRecognizer>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  selectedPlace: state.home.selectedPlace,
  level: state.home.level
});

export default connect(mapStateToProps, bindActions)(CarouselList);
