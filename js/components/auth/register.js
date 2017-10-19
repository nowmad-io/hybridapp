import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
} from 'native-base';
import { NavigationActions } from 'react-navigation';

import { registerRequest } from '../../actions/auth';

import styles from './styles';

const background = require('../../../images/shadow.png');

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
    login: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      error: '',
    };
  }

  _register() {
    this.props.register({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    });
  }

  _backToLogin() {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <Image source={background} style={styles.shadow}>
              <View style={styles.bg}>
                <Item>
                  <Icon active name="md-mail" />
                  <Input
                    name="email"
                    value={this.state.email}
                    placeholder="EMAIL"
                    onChangeText={email => this.setState({ email })}
                  />
                  {this.state.error
                    ? <Item style={{ borderColor: 'transparent' }}>
                      <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                      <Text style={{ fontSize: 15, color: 'red' }}>{ this.state.error }</Text>
                    </Item>
                    : <Text />}
                </Item>
                <Item>
                  <Icon active name="md-person" />
                  <Input
                    name="first_name"
                    value={this.state.first_name}
                    placeholder="First Name"
                    onChangeText={first_name => this.setState({ first_name })}
                  />
                  {this.state.error
                    ? <Item style={{ borderColor: 'transparent' }}>
                      <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                      <Text style={{ fontSize: 15, color: 'red' }}>{ this.state.error }</Text>
                    </Item>
                    : <Text />}
                </Item>
                <Item>
                  <Icon active name="md-person" />
                  <Input
                    name="last_name"
                    value={this.state.last_name}
                    placeholder="Last Name"
                    onChangeText={last_name => this.setState({ last_name })}
                  />
                  {this.state.error
                    ? <Item style={{ borderColor: 'transparent' }}>
                      <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                      <Text style={{ fontSize: 15, color: 'red' }}>{ this.state.error }</Text>
                    </Item>
                    : <Text />}
                </Item>
                <Item>
                  <Icon active name="md-unlock" />
                  <Input
                    name="password"
                    value={this.state.password}
                    placeholder="PASSWORD"
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                  />
                  {this.state.error
                    ? <Item style={{ borderColor: 'transparent' }}>
                      <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                      <Text style={{ fontSize: 15, color: 'red' }}>{ this.state.error }</Text>
                    </Item>
                    : <Text />}
                </Item>
                <Button
                  style={styles.btn}
                  onPress={() => this._register()}
                >
                  <Text>Register</Text>
                </Button>
                <Text onPress={() => this._backToLogin()}>Login</Text>
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
  register: (credentials) => dispatch(registerRequest(credentials)),
});

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default connect(mapStateToProps, bindActions)(Login);
