import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import LayoutView from '../../dumbs/layoutView';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import ProfilePicker from '../../dumbs/profilePicker';
import Spinner from '../../dumbs/spinner';

import { register } from '../../../actions/auth';

import { colors, font } from '../../../parameters';

class Profile extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    authLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      picture: {},
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { navigation } = this.props;

    navigation.goBack();

    return true;
  }

  onRegisterPress = () => {
    const {
      email, password, firstName, lastName,
    } = this.props.navigation.state.params;
    const { picture } = this.state;

    this.props.dispatch(register({
      email,
      password,
      firstName,
      lastName,
      picture: picture.path,
    }));
  }

  onSkipPress = () => {
    const {
      email, password, firstName, lastName,
    } = this.props.navigation.state.params;

    this.props.dispatch(register({
      email,
      password,
      firstName,
      lastName,
    }));
  }

  onPictureSelected = picture => this.setState({ picture });

  render() {
    const { picture: { uri } } = this.state;

    return (
      <LayoutView type="container" style={styles.container}>
        <View style={styles.skipWrapper}>
          <Text
            style={styles.skip}
            onPress={this.onSkipPress}
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
        <Spinner overlay visible={this.props.authLoading} />
      </LayoutView>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  authLoading: state.auth.authLoading,
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