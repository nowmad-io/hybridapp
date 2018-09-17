import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { uploadPicture } from '../../../libs/pictureUpload';
import NavigationService from '../../../libs/navigationService';

import LayoutView from '../../dumbs/layoutView';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import ProfilePicker from '../../dumbs/profilePicker';
import Spinner from '../../dumbs/spinner';
import Modal from '../../dumbs/modal';

import { apiRegister, authenticate } from '../../../actions/auth';

import { registerFailed, registerNoNetwork } from '../../../modals';
import { colors, font } from '../../../parameters';

class Profile extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    isConnected: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      picture: {},
      loading: false,
      error: null,
    };
  }

  onRegisterPress = () => {
    const { picture } = this.state;

    if (!this.props.isConnected) {
      this.setState({
        error: registerNoNetwork,
      });
      return;
    }

    this.setState({ loading: true });

    uploadPicture(picture.path, this.register(), this.register(true));
  }

  register = (err = false) => (uri = null) => {
    const {
      email, password, firstName, lastName,
    } = this.props.navigation.state.params;


    if (!this.props.isConnected) {
      this.setState({
        error: registerNoNetwork,
      });
      return;
    }

    this.setState({ loading: true });

    apiRegister({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      picture: !err ? uri : null,
    }).then(({ auth_token: authToken }) => {
      this.props.dispatch(authenticate(authToken));
      this.props.navigation.dispatch(NavigationService.resetAction());
    }).catch(() => {
      this.setState({
        loading: false,
        error: registerFailed,
      });
    });
  }

  onPictureSelected = picture => this.setState({ picture });

  closeModal = () => this.setState({ error: null });

  onSecondaryAction = () => this.setState(
    { error: null },
    () => this.props.navigation.navigate('Login', {
      login: true,
      email: this.props.navigation.state.params.email,
      setEmail: this.props.navigation.state.params.setEmail,
    }),
  );

  render() {
    const { picture: { uri }, loading, error } = this.state;

    return (
      <LayoutView type="container" style={styles.container}>
        <View style={styles.skipWrapper}>
          <Text
            style={styles.skip}
            onPress={this.register(true)}
          >
            Skip
          </Text>
        </View>
        <View style={styles.pictureWrapper}>
          <Text style={styles.title}>
            Choose your
          </Text>
          <Text style={styles.title}>
            profile picture
          </Text>
          <ProfilePicker
            style={styles.profilePicker}
            uri={uri}
            onPictureSelected={this.onPictureSelected}
          />
        </View>

        <View style={styles.actionWrapper}>
          <Button
            light
            disabled={!uri}
            onPress={this.onRegisterPress}
          >
            <Text style={styles.mainText}>Enter to Nowmad</Text>
          </Button>
        </View>
        <Spinner overlay visible={loading} />
        <Modal
          {...(error || {})}
          visible={!!error}
          onRequestClose={this.closeModal}
          onPrimaryAction={this.closeModal}
          onSecondaryAction={this.onSecondaryAction}
        />
      </LayoutView>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
});

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 100,
    backgroundColor: colors.green,
  },
  skip: {
    color: colors.white,
    fontSize: 16,
    fontWeight: font.fontWeight.regular,
  },
  skipWrapper: {
    marginHorizontal: 24,
    alignItems: 'flex-end',
  },
  actionWrapper: {
    marginHorizontal: 24,
  },
  mainText: {
    color: colors.black,
  },
  title: {
    color: colors.white,
    marginHorizontal: 80,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: font.fontWeight.medium,
    textAlign: 'center',
  },
  pictureWrapper: {
    marginTop: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePicker: {
    marginTop: 48,
  },
});
