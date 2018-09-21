import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import NavigationService from '../../../libs/navigationService';

import LayoutView from '../../dumbs/layoutView';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import ProfilePicker from '../../dumbs/profilePicker';

import { updateProfile } from '../../../actions/auth';

import { colors, font } from '../../../parameters';

class Profile extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      picture: {},
    };
  }

  onUpdateProfilePress = () => {
    const { picture } = this.state;

    this.props.dispatch(updateProfile({ picture: picture.path }));
    this.onSkipButton();
  }

  onPictureSelected = picture => this.setState({ picture });

  onSkipButton = () => this.props.navigation.dispatch(NavigationService.resetAction());

  render() {
    const { picture: { uri } } = this.state;

    return (
      <LayoutView type="container" style={styles.container}>
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
            onPress={this.onUpdateProfilePress}
          >
            <Text style={styles.mainText}>Enter to Nowmad</Text>
          </Button>

          <Button
            trasnparent
            onPress={this.onSkipButton}
            style={styles.skipButton}
          >
            <Text style={styles.skipText} uppercase={false}>Skip</Text>
          </Button>
        </View>
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
    paddingTop: 48,
    paddingBottom: 100,
    backgroundColor: colors.green,
  },
  skipButton: {
    marginTop: 16,
  },
  skipText: {
    color: colors.whiteTransparentLight,
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
