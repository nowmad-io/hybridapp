import React from 'react';
import { AppRegistry, Image, TouchableOpacity } from 'react-native';
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
} from 'native-base';

const logo = require('../../../images/logo.png');

const routes = ['Home', 'BlankPage'];

export default class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <Container>
        <Content>
          <List
            style={{
              paddingTop: 18,
            }}
            dataArray={routes}
            renderRow={data => (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data)}
              >
                <Text>{data}</Text>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}
