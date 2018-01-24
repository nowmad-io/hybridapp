import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import {
  Content,
  Item,
  Input,
  Button,
  Icon
} from 'native-base';
import { NavigationActions } from 'react-navigation';

import { loginRequest } from '../../actions/auth';

import Container from '../dumbs/container';
import Text from '../dumbs/text';
import Spinner from '../loaders/spinner';

import styles, { colors } from './styles';
const logo = require('../../../assets/images/logos/full_logo_horizontal.png');

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
      email: 'j@j.com',
      password: 'j',
    };

    // Check if logged in and redirect to App if so
    const { loggedIn } = props;

    if (loggedIn) {
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'App' })],
      });
      this.props.navigation.dispatch(actionToDispatch);
    }
  }

  _login() {
    this.props.login(this.state.email, this.state.password);
  }

  _register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image resizeMethod="resize" source={logo} style={styles.logo} />
        </View>
        <Content padder style={styles.content}>
          <View style={styles.itemsWrapper}>
            <Item style={styles.inputItem}>
              <Icon active name="person" style={styles.inputIcon} />
              <Input
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="email"
                value={this.state.email}
                placeholder="EMAIL"
                onChangeText={email => this.setState({ email })}
              />
              {this.state.error
                ? <Item style={{ borderColor: 'transparent' }}>
                  <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                  <Text style={{ fontSize: 15, color: 'red' }}>{ this.props.error }</Text>
                </Item>
                : <Text />}
            </Item>
            <Item style={styles.inputItem}>
              <Icon active name="unlock" style={styles.inputIcon} />
              <Input
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="password"
                value={this.state.password}
                placeholder="PASSWORD"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
              {this.state.error
                ? <Item style={{ borderColor: 'transparent' }}>
                  <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                  <Text style={{ fontSize: 15, color: 'red' }}>{ this.props.error }</Text>
                </Item>
                : <Text />}
            </Item>
            <Button
              rounded light
              style={styles.button}
              onPress={() => this._login()}>
              <Text style={styles.text}>Login</Text>
            </Button>
            <Button
              transparent light
              style={styles.button}
              onPress={() => this._register()}>
              <Text>Register</Text>
            </Button>
          </View>
        </Content>
        <Spinner overlay={true} visible={this.props.loginLoading}/>
      </Container>
    );
  }
}

const bindActions = dispatch => ({
  login: (email, password) => dispatch(loginRequest({ email, password })),
});

const mapStateToProps = state => ({
  loggedIn: !!state.auth.token,
  error: state.auth.error,
  loginLoading: state.auth.loginLoading
});

export default connect(mapStateToProps, bindActions)(Login);
