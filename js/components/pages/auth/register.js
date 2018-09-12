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

  render() {
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
          <FormInput
            style={styles.formField}
            inputStyle={styles.formFieldInput}
            underlineColor={colors.white}
            selectionColor={colors.white}
            placeholderColor={colors.greenLight}
            placeholder="First name"
            onChangeText={firstName => this.setState({ firstName })}
          />
          <FormInput
            style={styles.formField}
            inputStyle={styles.formFieldInput}
            underlineColor={colors.white}
            selectionColor={colors.white}
            placeholderColor={colors.greenLight}
            placeholder="Last name"
            onChangeText={lastName => this.setState({ lastName })}
          />
          <FormInput
            style={styles.formField}
            inputStyle={styles.formFieldInput}
            underlineColor={colors.white}
            selectionColor={colors.white}
            placeholderColor={colors.greenLight}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
          />
          <FormInput
            style={styles.formField}
            inputStyle={styles.formFieldInput}
            underlineColor={colors.white}
            selectionColor={colors.white}
            placeholderColor={colors.greenLight}
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
          />
        </View>

        <View style={styles.actionsWrapper}>
          <Button light style={styles.registerButton}>
            <Text style={styles.registerText}>Create an account</Text>
          </Button>
          <Button style={styles.loginButton}>
            <Text>Log in</Text>
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
    justifyContent: 'center',
    marginTop: 22,
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
  registerText: {
    color: colors.black,
  },
  registerButton: {
    opacity: 0.6,
  },
  loginButton: {
    marginTop: 10,
  },
});
