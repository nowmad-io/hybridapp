import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View, Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { ParallaxImage } from 'react-native-snap-carousel';

import { entryStyles } from './styles';

class Entry extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    index: PropTypes.number
  };

  render () {
    const { data: { title }, index } = this.props;
    console.log('here ?', entryStyles.slideInnerContainer(index));
    return (
      <View
        style={entryStyles.slideInnerContainer(index)}>
        <Card style={{height: '100%', width: '100%', flex: 0}}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'http://www.ordnung-statt-chaos.de/wp-content/themes/thesis/rotator/sample-4.jpg'}} />
              <Body>
                <Text>{ title }</Text>
                <Text note>note</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Image source={{uri: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-163188684_medium.jpg?sharp=10&vib=20&w=600'}} style={{height: 200, width: 200, flex: 1}}/>
              <Text>
                Description
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
                <Icon name="logo-github" />
                <Text>1,926 stars</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default Entry
