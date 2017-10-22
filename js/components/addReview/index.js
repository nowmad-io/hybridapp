import React, { Component } from 'react';
import { Animated, PanResponder } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Content, Left, Body, Right, Button, Icon,
  Text, View, Item, Input, Label, ListItem, Radio } from 'native-base';

import Map from '../map';
import Marker from '../marker';
import BasicButton from '../basicButton';

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
      categories: [{name: 'city'}],
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
      }
    }))
  }

  render() {
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
          <View>
            <Text>My review</Text>
            <Item stackedLabel>
              <Label>Add a short description about this place</Label>
              <Input
                placeholder="e.g The best place !"
                onChangeText={short_description => this.setState({ short_description })} />
            </Item>
            <View>
              <ListItem>
                <Text>travelling here</Text>
                <Right>
                  <Radio selected={false} />
                </Right>
              </ListItem>
              <ListItem>
                <Text>living here</Text>
                <Right>
                  <Radio selected={true} />
                </Right>
              </ListItem>
              <ListItem>
                <Text>local</Text>
                <Right>
                  <Radio selected={true} />
                </Right>
              </ListItem>
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
