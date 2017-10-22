import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import shortid from 'shortid';

import { selectedPlace, levelChange } from '../../actions/home'
import GestureRecognizer from '../swipeGestures';
import Entry from './entry';

import variables from "../../../native-base-theme/variables/platform";
import styles, { dimension, sliderWidth, itemWidth } from './styles';

class CarouselList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    places: PropTypes.array,
    customStyle: PropTypes.object,
    selectedPlace: PropTypes.object,
    level: PropTypes.number
  }

  constructor(props) {
    super(props);

    this.state = {
      carouselTop: [80, 232, dimension.height - variables.toolbarHeight- 40 - 12 ]
    }
  }

  componentWillReceiveProps({ selectedPlace }) {
    if ( selectedPlace.id !== this.props.selectedPlace.id && this.carousel) {
      let placeIndex = 0;
      this.props.places.find(function(place, index) {
        if (place.id === selectedPlace.id) {
          placeIndex = index;
          return true;
        }
        return false;
      });
      this.carousel.snapToItem(placeIndex);
    }
  }

  onSwipeUp() {
    if (this.props.level >= 2) {
      return;
    }
    this.props.dispatch(levelChange(this.props.level + 1));
  }

  onSwipeDown() {
    if (this.props.level <= 0) {
      return;
    }
    this.props.dispatch(levelChange(this.props.level - 1))
  }

  onSnapToItem(selectedItem) {
    this.props.dispatch(selectedPlace(this.props.places[selectedItem]));
  }

  _renderItem ({item, index}, carouselTop, level) {
    return (
      <Entry
        key={item.id}
        place={item}
        index={index}
        selected={item.id===this.props.selectedPlace}
        level={level}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    const { carouselTop } = this.state;
    const { level } = this.props;
    return (
      <GestureRecognizer
        onSwipeUp={() => this.onSwipeUp()}
        onSwipeDown={() => this.onSwipeDown()}
        velocityThreshold={1}
        style={{...styles.carouselWrapper, top: dimension.height - 28 - carouselTop[level]}}
      >
        <Carousel
          ref={(c) => {this.carousel = c;}}
          data={this.props.places}
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
