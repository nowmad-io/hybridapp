import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
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

import BlankPage from '../blankPage';
import DrawBar from '../DrawBar';

import { openDrawer } from '../../actions/drawer';

import styles from './styles';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };
  static propTypes = {
    openDrawer: React.PropTypes.func,
  };

  newPage(index) {
    Actions.blankPage();
  }

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

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(Home);
