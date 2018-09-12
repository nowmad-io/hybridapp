import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import LayoutView from '../../dumbs/layoutView';
import Content from '../../dumbs/content';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import FormInput from '../../dumbs/formInput';
import Spinner from '../../dumbs/spinner';

import { apiRegister } from '../../../api/auth';

import { colors, font } from '../../../parameters';

const logo = require('../../../../assets/images/logos/logo_white.png');

class Register extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object,
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

  onRegisterPress = () => {
    const { params } = this.props.navigation.state;
    const login = params && params.login;

    if (login) {
      this.props.navigation.goBack();
    } else {
      this.props.dispatch(apiRegister({
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
      }));
    }
  }

  onLoginPress = () => {
    this.props.navigation.navigate('Login', { login: true });
  }

  render() {
    const {
      email, password, firstName, lastName,
    } = this.state;

    const { params } = this.props.navigation.state;
    const login = params && params.login;
    const valid = email && password && (login || (firstName && lastName));

    return (
      <Content>
        <LayoutView type="container" style={styles.container}>
          <View style={styles.logoWrapper}>
            <Image
              resizeMode="contain"
              source={logo}
              style={styles.logo}
            />
            <View>
              <Text style={styles.text}>
                Welcome to
              </Text>
              <Text style={[styles.text, styles.name]}>
                nowmad
              </Text>
            </View>
          </View>
          <View style={styles.formWrapper}>
            {!login && (
              <View>
                <FormInput
                  style={styles.formField}
                  inputStyle={styles.formFieldInput}
                  underlineColor={colors.white}
                  selectionColor={colors.white}
                  placeholderColor={colors.greenLight}
                  placeholder="First name"
                  onChangeText={text => this.setState({ firstName: text })}
                />
                <FormInput
                  style={styles.formField}
                  inputStyle={styles.formFieldInput}
                  underlineColor={colors.white}
                  selectionColor={colors.white}
                  placeholderColor={colors.greenLight}
                  placeholder="Last name"
                  onChangeText={text => this.setState({ lastName: text })}
                />
              </View>
            )}
            <FormInput
              style={styles.formField}
              inputStyle={styles.formFieldInput}
              underlineColor={colors.white}
              selectionColor={colors.white}
              placeholderColor={colors.greenLight}
              placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
            />
            <FormInput
              style={styles.formField}
              inputStyle={styles.formFieldInput}
              underlineColor={colors.white}
              selectionColor={colors.white}
              placeholderColor={colors.greenLight}
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>

          <View style={styles.actionsWrapper}>
            <Button
              disable={!login && !valid}
              light={!login}
              onPress={this.onRegisterPress}
            >
              <Text style={!login && styles.mainText}>Create an account</Text>
            </Button>
            <Button
              disable={login && !valid}
              light={login}
              style={styles.loginButton}
              onPress={this.onLoginPress}
            >
              <Text style={login && styles.mainText}>Log in</Text>
            </Button>
          </View>
          <Spinner overlay visible={this.props.authLoading} />
        </LayoutView>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps)(Register);

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 52,
    backgroundColor: colors.green,
  },
  logoWrapper: {
    paddingLeft: 52,
    paddingRight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  text: {
    color: colors.white,
    fontSize: 24,
    fontWeight: font.fontWeight.medium,
    lineHeight: 34,
  },
  name: {
    fontSize: 32,
    fontWeight: font.fontWeight.bold,
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 64,
    marginHorizontal: 22,
  },
  formField: {
    marginBottom: 22,
  },
  formFieldInput: {
    marginVertical: 2,
    color: colors.white,
    fontWeight: font.fontWeight.medium,
  },
  actionsWrapper: {
    marginHorizontal: 24,
  },
  mainText: {
    color: colors.black,
  },
  loginButton: {
    marginTop: 10,
  },
});
