import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { apiRegister } from '../../../api/auth';

import Icon from '../../dumbs/icon';
import LayoutView from '../../dumbs/layoutView';
import Content from '../../dumbs/content';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import Spinner from '../../dumbs/spinner';

import styles, { colors } from './styles';

const logo = require('../../../../assets/images/logos/full_logo_horizontal.png');

class Register extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    authLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  _register() {
    this.props.dispatch(apiRegister({
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
    }));
  }

  _backToLogin() {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    return (
      <LayoutView type="container" style={styles.container}>
        <View style={[styles.logoWrapper, styles.logoWrapperRegister]}>
          <Image resizeMethod="resize" source={logo} style={styles.logo} />
        </View>
        <Content padder style={styles.content}>
          <View style={styles.itemsWrapper}>
            <View style={styles.item}>
              <Icon active name="mail" style={styles.inputIcon} />
              <TextInput
                underlineColorAndroid="transparent"
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.item}>
              <Icon active name="person" style={styles.inputIcon} />
              <TextInput
                underlineColorAndroid="transparent"
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="firstName"
                value={this.state.firstName}
                placeholder="First Name"
                onChangeText={firstName => this.setState({ firstName })}
              />
            </View>
            <View style={styles.item}>
              <Icon active name="person" style={styles.inputIcon} />
              <TextInput
                underlineColorAndroid="transparent"
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="lastName"
                value={this.state.lastName}
                placeholder="Last Name"
                onChangeText={lastName => this.setState({ lastName })}
              />
            </View>
            <View style={styles.item}>
              <Icon active name="lock-open" style={styles.inputIcon} />
              <TextInput
                underlineColorAndroid="transparent"
                selectionColor={colors.whiteTransparent}
                placeholderTextColor={colors.white}
                style={styles.input}
                name="password"
                value={this.state.password}
                placeholder="Password"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <Button
              rounded
              light
              style={styles.button}
              onPress={() => this._register()}
            >
              <Text>register</Text>
            </Button>
            <Button
              transparent
              style={styles.button}
              onPress={() => this._backToLogin()}
            >
              <Text>Login</Text>
            </Button>
          </View>
        </Content>
        <Spinner overlay visible={this.props.authLoading} />
      </LayoutView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps, null)(Register);
