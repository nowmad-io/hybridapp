import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Api } from '../../../libs/requests';
import NavigationService from '../../../libs/navigationService';
import { apiLogin, authenticate } from '../../../actions/auth';

import LayoutView from '../../dumbs/layoutView';
import Content from '../../dumbs/content';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import FormInput from '../../dumbs/formInput';
import Spinner from '../../dumbs/spinner';
import Modal from '../../dumbs/modal';

import { loginFailed, loginNoNetwork } from '../../../modals';
import { colors, font } from '../../../parameters';

const logo = require('../../../../assets/images/logos/logo_white.png');

class Auth extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    token: PropTypes.string,
    isConnected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    this.state = {
      email: params && params.email || '',
      password: '',
      firstName: '',
      lastName: '',
      loading: false,
      error: null,
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
    const {
      email, password, firstName, lastName,
    } = this.state;
    const { params } = this.props.navigation.state;
    const login = params && params.login;

    if (login) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate('Profile', {
        email,
        password,
        firstName,
        lastName,
        setEmail: this.setEmail,
      });
    }
  }

  onLoginPress = () => {
    const { email, password } = this.state;
    const { navigation, dispatch, isConnected } = this.props;
    const { params } = this.props.navigation.state;
    const login = params && params.login;

    if (!login) {
      navigation.navigate('Login', {
        login: true,
        email,
        setEmail: this.setEmail,
      });
    } else {
      if (!isConnected) {
        this.setState({
          error: loginNoNetwork,
        });
        return;
      }

      this.setState({ loading: true });

      apiLogin({
        email,
        password,
      }).then(({ auth_token: authToken }) => {
        dispatch(authenticate(authToken));
        navigation.dispatch(NavigationService.resetAction());
      }).catch(() => {
        this.setState({
          loading: false,
          error: loginFailed,
        });
      });
    }
  }

  setEmail = (email) => {
    this.setState({ email });
  }

  closeModal = () => this.setState({ error: null });

  onSecondaryAction = () => this.setState(
    { error: null },
    () => {
      this.props.navigation.state.params.setEmail(this.state.email);
      this.props.navigation.goBack();
    },
  );

  render() {
    const {
      email, password, firstName, lastName, loading, error,
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
              autoCapitalize="none"
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
              defaultValue={password}
              autoCapitalize="none"
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
          <Spinner overlay visible={loading} />
        </LayoutView>
        <Modal
          {...(error || {})}
          visible={!!error}
          onRequestClose={this.closeModal}
          onPrimaryAction={this.closeModal}
          onSecondaryAction={this.onSecondaryAction}
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
