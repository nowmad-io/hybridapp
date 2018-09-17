import Config from 'react-native-config';
import Mixpanel, { MixpanelInstance } from 'react-native-mixpanel';

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
