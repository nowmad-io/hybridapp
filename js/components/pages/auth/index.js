import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Api } from '../../../libs/requests';
import NavigationService from '../../../libs/navigationService';
import { apiLogin } from '../../../actions/auth';

import LayoutView from '../../dumbs/layoutView';
import Content from '../../dumbs/content';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import FormInput from '../../dumbs/formInput';
import Spinner from '../../dumbs/spinner';
import Modal from '../../dumbs/modal';

import { registerFailed } from '../../../modals';
import { colors, font } from '../../../parameters';

const logo = require('../../../../assets/images/logos/logo_white.png');

class Auth extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    authLoading: PropTypes.bool,
    token: PropTypes.string,
    error: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      email: params && params.email || 'j@j.com',
      password: 'j',
      firstName: '',
      lastName: '',
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { token } = this.props;

    if (token) {
      Api.setAuthorisation(token);
      this.props.navigation.dispatch(NavigationService.resetAction());
    }
  }

  onRegisterPress = () => {
    const { params } = this.props.navigation.state;
    const login = params && params.login;

    if (login) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate('Profile', {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });
    }
  }

  onLoginPress = () => {
    const { params } = this.props.navigation.state;
    const login = params && params.login;

    if (!login) {
      this.props.navigation.navigate('Login', {
        login: true,
        email: this.state.email,
      });
    } else {
      this.props.dispatch(apiLogin({
        email: this.state.email,
        password: this.state.password,
      }));
    }
  }

  closeModal = () => this.setState({ modalVisible: false });

  render() {
    const {
      email, password, firstName, lastName, modalVisible,
    } = this.state;

    const { params } = this.props.navigation.state;
    const login = params && params.login;
    const valid = email && password && (login || (firstName.replace(/\s/g, '') && lastName.replace(/\s/g, '')));

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
              defaultValue={email}
              placeholder="Email"
              onChangeText={text => this.setState({ email: text })}
            />
            <FormInput
              password
              style={styles.formField}
              inputStyle={styles.formFieldInput}
              showPasswordStyle={styles.showPasswordStyle}
              underlineColor={colors.white}
              selectionColor={colors.white}
              placeholderColor={colors.greenLight}
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
            />
          </View>

          <View style={styles.actionsWrapper}>
            <Button
              disabled={!login && !valid}
              light={!login}
              onPress={this.onRegisterPress}
            >
              <Text style={!login && styles.mainText}>Create an account</Text>
            </Button>
            <Button
              disabled={login && !valid}
              light={login}
              style={styles.loginButton}
              onPress={this.onLoginPress}
            >
              <Text style={login && styles.mainText}>Log in</Text>
            </Button>
          </View>
          <Spinner overlay visible={this.props.authLoading} />
        </LayoutView>
        <Modal
          {...registerFailed}
          visible={modalVisible}
          onRequestClose={this.closeModal}
          onPrimaryAction={this.closeModal}
        />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(Auth);

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
  showPasswordStyle: {
    color: colors.white,
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
