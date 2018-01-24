import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CodePush from 'react-native-code-push';

import Modal from 'react-native-modalbox';
import MainRouter from './Routers/MainRouter';
import ProgressBar from './components/loaders/ProgressBar';
import Text from './components/dumbs/text';
import LayoutView from './components/dumbs/layoutView';

import theme from './themes/base-theme';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0,
    };
  }

  componentDidMount() {
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

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <LayoutView type='container'>
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
        </LayoutView>
      );
    }

    return <MainRouter />;
  }
}

export default App;
