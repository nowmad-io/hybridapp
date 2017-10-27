import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  Container,
  List,
  ListItem,
  Content,
} from 'native-base';

import { logoutRequest } from '../../actions/auth';

class DrawBar extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
  };

  _navigate(data) {
    this.props.navigation.navigate(data)
  }

  _logout() {
    this.props.dispatch(logoutRequest());
  }

  render() {
    return (
      <Container>
        <Content>
          <List
            style={{
              paddingTop: 18,
            }}
          >
            <ListItem
              button
              onPress={() => this._navigate('Home')}
            >
              <Text>Home</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => this._navigate('Friends')}
            >
              <Text>Friends</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => this._navigate('MapList')}
            >
              <Text>MapList</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => this._navigate('Test')}
            >
              <Text>Test</Text>
            </ListItem>
            <ListItem
              button
              onPress={() => this._logout()}
            >
              <Text>Logout</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
});

const mapStateToProps = null

export default connect(mapStateToProps, bindActions)(DrawBar);
