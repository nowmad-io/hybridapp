import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: React.PropTypes.object,
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon active name="menu" />
            </Button>
          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => {
                const actionToDispatch = NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(actionToDispatch);
              }}
            >
              <Icon active name="power" />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text>
            Home page (soon to be a map !)
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindAction() {
  return {};
}
const mapStateToProps = null;

export default connect(mapStateToProps, bindAction)(Home);
