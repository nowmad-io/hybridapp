import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { Item, Input, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';

import { registerRequest } from '../../actions/auth';

import Icon from '../dumbs/icon';
import LayoutView from '../dumbs/layoutView';
import Content from '../dumbs/content';
import Text from '../dumbs/text';
import Spinner from '../loaders/spinner';

import styles, { colors } from './styles';
const logo = require('../../../assets/images/logos/full_logo_horizontal.png');

class Register extends Component {
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
      <LayoutView type='container' style={styles.container}>
        <View style={[styles.logoWrapper, styles.logoWrapperRegister]}>
          <Image resizeMethod="resize" source={logo} style={styles.logo} />
        </View>
        <Content padder style={styles.content}>
          <View style={styles.itemsWrapper}>
            <Item style={styles.inputItem}>
              <Icon active name="mail" style={styles.inputIcon} />
              <Input
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
              />
              {this.state.error
                ? <Item style={{ borderColor: 'transparent' }}>
                  <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                  <Text style={{ fontSize: 15, color: 'red' }}>{ this.state.error }</Text>
                </Item>
                : <Text />}
            </Item>
            <Item style={styles.inputItem}>
              <Icon active name="person" style={styles.inputIcon} />
              <Input
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
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
            <Item style={styles.inputItem}>
              <Icon active name="person" style={styles.inputIcon} />
              <Input
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="last_name"
                value={this.state.last_name}
                placeholder="Last Name"
                onChangeText={last_name => this.setState({ last_name })}
              />
              {this.state.error
                ? <Item style={{ borderColor: 'transparent' }}>
                  <Icon active style={{ color: 'red', marginTop: 5 }} name="bug" />
                  <Text style={{ fontSize: 15, color: 'red' }}>{ this.props.error }</Text>
                </Item>
                : <Text />}
            </Item>
            <Item style={styles.inputItem}>
              <Icon active name="lock-open" style={styles.inputIcon} />
              <Input
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="password"
                value={this.state.password}
                placeholder="Password"
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
              onPress={() => this._register()}>
              <Text style={styles.text}>register</Text>
            </Button>
            <Button
              transparent light
              style={styles.button}
              onPress={() => this._backToLogin()}>
              <Text>Login</Text>
            </Button>
          </View>
        </Content>
        <Spinner overlay={true} visible={this.props.registerLoading}/>
      </LayoutView>
    );
  }
}

const bindActions = dispatch => ({
  dispatch,
  register: (credentials) => dispatch(registerRequest(credentials)),
});

const mapStateToProps = state => ({
  error: state.auth.error,
  registerLoading: state.auth.registerLoading,
});

export default connect(mapStateToProps, bindActions)(Register);
