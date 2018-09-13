import Config from 'react-native-config';
import Mixpanel, { MixpanelInstance } from 'react-native-mixpanel';
// User Profile
// Mixpanel.set({
//   '$fist': 'shandra', // super property
//   Lastname: 'menendez', // super property
//   Email: 'shandra.aich@gmail.com', // super property
//   '# of reviews': 3,
// });
//
//
// // Register
// Mixpanel.track('Register', {
//   picture: '',
//   date: '',
// });
//
class MixpanelService {
  constructor() {
    this.mixpanel = callback => (
      MixpanelInstance.initialized
        ? Mixpanel.sharedInstanceWithToken(Config.MIXPANEL_KEY)
        : Promise.resolve(true))
      .then(() => callback())
      // eslint-disable-next-line no-console
      .catch(error => console.log('Failed to initialize Mixpanel: ', error));

    Object.getOwnPropertyNames(Mixpanel)
      .forEach((property) => { this[property] = Mixpanel[property]; });
  }
}

export default new MixpanelService();
