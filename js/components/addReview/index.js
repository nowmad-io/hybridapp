import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardItem, Container, Header, Content, Left, Body, Right, Button, Icon,
  Text, View, Radio } from 'native-base';
import _ from 'lodash';

import { categoriesList, statusList } from '../../lists';
import Map from '../map';
import Marker from '../marker';
import Tag from '../tag';
import Label from '../label';
import FormInput from '../formInput';
import BasicButton from '../basicButton';
import RadioButtons from '../radioButtons';

import { addReview } from '../../api/reviews';

import styles from './styles';

class AddReview extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      place: props.navigation.state.params.place,
      short_description: '',
      categories: [],
      status: '',
      pictures: []
    }
  }

  onRef = (ref) => {
    this._map = ref;
  }

  onMapReady = () => {
    if (this._map) {
      this._map.animateToCoordinate(this.state.place);
    }
  }

  onPublish = () => {
    this.props.dispatch(addReview({
      ...this.state,
      place: {
        latitude: this.state.place.latitude,
        longitude: this.state.place.longitude
      },
      categories: categories.map((categorie) => ({
        name: categorie
      }))
    }))
  }

  toggleCategorie(categorie) {
    console.log('here ?', categorie)
    const { categories } = this.state;
    let newCategories = categories;

    console.log('categories bef', categories)

    const selected = _.indexOf(categories, categorie) !== -1;

    if (selected) {
      newCategories = _.without(newCategories, categorie);
    } else {
      newCategories.push(categorie);
    }

    this.setState({ categories: newCategories });
    console.log('categories aft', categories)
  }

  render() {
    const { categories } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Right>
            <Button transparent>
              <Text>SAVE AND EXIT</Text>
            </Button>
          </Right>
        </Header>
        <Content style={styles.content}>
          <View style={styles.mapWrapper}>
            <Map
              onRef={this.onRef}
              onMapReady={this.onMapReady}
              zoomEnabled={true}
              rotateEnabled={false}
              scrollEnabled={true}
              region={this.props.region}
            >
             <Marker place={this.state.place} />
            </Map>
          </View>
          <View style={styles.reviewWrapper}>
            <Text style={styles.title}>My review</Text>
            <View>
              <Label
                text="Add a short description about this place"
                required={true} />
              <FormInput
                placeholder="e.g The best place !"
                onChangeText={short_description => this.setState({ short_description })}
                maxLength={50} />
            </View>
            <View>
              <Label text="You were..." required={true}/>
              <RadioButtons
                list={statusList}
                onSelect={(status) => this.setState({ status })}
              >
              </RadioButtons>
            </View>
            <View>
              <Label text="Was it..." />
              <View style={styles.tagWrapper}>
                {categoriesList.map((categorie, index) => (
                  <Tag
                    key={index}
                    text={categorie}
                    selected={_.indexOf(categories, categorie) !== -1}
                    onPress={() => this.toggleCategorie(categorie)}
                  />
                ))}
              </View>
            </View>
          </View>
        </Content>
        <BasicButton
          text='PUBLISH'
          onPress={this.onPublish} />
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = (state) => ({
  region: state.home.region
});

export default connect(mapStateToProps, bindActions)(AddReview);
