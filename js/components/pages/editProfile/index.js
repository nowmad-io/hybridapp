import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';

import Content from '../../dumbs/content';
import LayoutView from '../../dumbs/layoutView';
import Text from '../../dumbs/text';
import Button from '../../dumbs/button';
import ProfilePicker from '../../dumbs/profilePicker';
import Spinner from '../../dumbs/spinner';
import FormInput from '../../dumbs/formInput';

import { updateProfile } from '../../../actions/auth';

import { colors, font } from '../../../parameters';

class EditProfile extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
    me: PropTypes.object,
    authLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const { me } = props;

    this.state = {
      firstName: me.first_name || '',
      lastName: me.last_name || '',
      picture: {
        uri: me.picture || null,
      },
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillReceiveProps({ me }) {
    this.setState({
      firstName: me.first_name || '',
      lastName: me.last_name || '',
      picture: {
        uri: me.picture || null,
      },
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { navigation } = this.props;

    navigation.goBack();

    return true;
  }

  onPictureSelected = picture => this.setState({ picture });

  onSavePress = () => this.props.dispatch(updateProfile({
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    picture: this.state.picture.path || this.state.picture.uri,
  }));

  render() {
    const { navigation, me } = this.props;
    const { firstName, lastName, picture: { uri } } = this.state;

    const valid = ((firstName !== me.first_name) && !!firstName)
      || ((lastName !== me.last_name) && !!lastName)
      || (uri !== me.picture);

    return (
      <Content>
        <LayoutView type="container" style={styles.container}>
          <LayoutView type="header">
            <LayoutView type="left">
              <Button transparent onPress={() => navigation.goBack()} icon="arrow-back" header />
            </LayoutView>
          </LayoutView>
          <View style={styles.pictureWrapper}>
            <Text style={styles.title}>
              Edit your
            </Text>
            <Text style={styles.title}>
              profile information
            </Text>
            <ProfilePicker
              style={styles.profilePicker}
              uri={uri}
              onPictureSelected={this.onPictureSelected}
            />
          </View>
          <View style={styles.formWrapper}>
            <FormInput
              style={styles.formField}
              inputStyle={styles.formFieldInput}
              suffixIconStyle={styles.suffixIconStyle}
              underlineColor={colors.white}
              selectionColor={colors.white}
              placeholderColor={colors.greenLight}
              defaultValue={firstName}
              placeholder="Firstname"
              onChangeText={text => this.setState({ firstName: text })}
              suffixIcon="edit"
            />
            <FormInput
              style={styles.formField}
              inputStyle={styles.formFieldInput}
              suffixIconStyle={styles.suffixIconStyle}
              underlineColor={colors.white}
              selectionColor={colors.white}
              placeholderColor={colors.greenLight}
              defaultValue={lastName}
              placeholder="Lastname"
              onChangeText={text => this.setState({ lastName: text })}
              suffixIcon="edit"
            />
          </View>
          <View style={styles.actionWrapper}>
            <Button
              light
              disabled={!valid}
              onPress={this.onSavePress}
            >
              <Text style={styles.mainText}>Save changes</Text>
            </Button>
          </View>
          <Spinner overlay visible={this.props.authLoading} />
        </LayoutView>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  me: state.auth.me,
  authLoading: state.auth.authLoading,
});

export default connect(mapStateToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formWrapper: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
  },
  profilePicker: {
    marginTop: 48,
  },
  formField: {
    marginBottom: 22,
  },
  formFieldInput: {
    marginVertical: 2,
    color: colors.white,
    fontWeight: font.fontWeight.medium,
  },
  actionWrapper: {
    paddingBottom: 52,
    paddingHorizontal: 24,
  },
  suffixIconStyle: {
    color: colors.whiteTransparentLight,
  },
  mainText: {
    color: colors.black,
  },
});
