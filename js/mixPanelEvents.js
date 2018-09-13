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
      .catch(error => console.log('Failed to initialize Mixpanel: ', error));
  }

  track = async (event) => {
    this.mixpanel(() => Mixpanel.track(event));
  };

  trackWithProperties = async (event) => {
    this.mixpanel(() => Mixpanel.trackWithProperties(event));
  };

  createAlias = async (event) => {
    this.mixpanel(() => Mixpanel.createAlias(event));
  };

  identify = async (event) => {
    this.mixpanel(() => Mixpanel.identify(event));
  };

  set = async (event) => {
    this.mixpanel(() => Mixpanel.set(event));
  };

  setOnce = async (event) => {
    this.mixpanel(() => Mixpanel.setOnce(event));
  };

  timeEvent = async (event) => {
    this.mixpanel(() => Mixpanel.timeEvent(event));
  };

  registerSuperProperties = async (event) => {
    this.mixpanel(() => Mixpanel.registerSuperProperties(event));
  };

  registerSuperPropertiesOnce = async (event) => {
    this.mixpanel(() => Mixpanel.registerSuperPropertiesOnce(event));
  };

  trackCharge = async (event) => {
    this.mixpanel(() => Mixpanel.trackCharge(event));
  };

  trackChargeWithProperties = async (event) => {
    this.mixpanel(() => Mixpanel.trackChargeWithProperties(event));
  };

  increment = async (event) => {
    this.mixpanel(() => Mixpanel.increment(event));
  };

  setPushRegistrationId = async (event) => {
    this.mixpanel(() => Mixpanel.setPushRegistrationId(event));
  };

  initPushHandling = async (event) => {
    this.mixpanel(() => Mixpanel.initPushHandling(event));
  };

  clearPushRegistrationId = async (event) => {
    this.mixpanel(() => Mixpanel.clearPushRegistrationId(event));
  };

  addPushDeviceToken = async (event) => {
    this.mixpanel(() => Mixpanel.addPushDeviceToken(event));
  };

  reset = async (event) => {
    this.mixpanel(() => Mixpanel.reset(event));
  };

  getDistinctId = async (event) => {
    this.mixpanel(() => Mixpanel.getDistinctId(event));
  };
}

export default new MixpanelService();
