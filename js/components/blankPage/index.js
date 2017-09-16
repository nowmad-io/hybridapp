import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
} from 'native-base';

class BlankPage extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: React.PropTypes.object,
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Blank page</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="ios-menu" />
            </Button>
          </Right>
        </Header>

        <Content padder>
          <Text>
            Create Something Awesome . . .
          </Text>
        </Content>
      </Container>
    );
  }
}

export default BlankPage;
