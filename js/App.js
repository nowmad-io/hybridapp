import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, BackHandler } from 'react-native';
import CodePush from 'react-native-code-push';
import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { connect } from 'react-redux';

import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';
import ProgressBar from './components/loaders/ProgressBar';

import theme from './themes/base-theme';

import styles from './styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0,
    };
  }

  static propTypes = {
    mainRouter: PropTypes.func,
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    CodePush.sync(
      { updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE },
      (status) => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ showDownloadingModal: true });
            this._modal.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ showInstalling: true });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            this._modal.close();
            this.setState({ showDownloadingModal: false });
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
      },
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container
          theme={theme}
          style={{ backgroundColor: theme.defaultBackgroundColor }}
        >
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={(c) => {
                this._modal = c;
              }}
              swipeToClose={false}
            >
              <View
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  padding: 20,
                }}
              >
                {this.state.showInstalling
                  ? <Text
                    style={{
                      color: theme.brandPrimary,
                      textAlign: 'center',
                      marginBottom: 15,
                      fontSize: 15,
                    }}
                  >
                      Installing update...
                  </Text>
                  : <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      justifyContent: 'center',
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.brandPrimary,
                        textAlign: 'center',
                        marginBottom: 15,
                        fontSize: 15,
                      }}
                    >
                        Downloading update...
                      {' '}
                      {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar
                      color="theme.brandPrimary"
                      progress={parseInt(this.state.downloadProgress, 10)}
                    />
                  </View>}
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }

    return <this.props.mainRouter navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />;
  }
}

function bindActions(dispatch) {
  return {
    dispatch
  };
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(App);
