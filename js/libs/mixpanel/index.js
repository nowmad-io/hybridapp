import Mixpanel from './instance';

export function identifyEvent(email) {
  Mixpanel.identify(email);
}

export function setProfile({
  email, first_name: firstName, last_name: lastName, nbReviews,
}) {
  Mixpanel.set({
    $distinct_id: email,
    $email: email,
    $first_name: firstName,
    $last_name: lastName,
    '# of reviews': nbReviews,
  });
}

export function registerSuperProperties({ email, first_name: firstName, last_name: lastName }) {
  Mixpanel.registerSuperProperties({
    $distinct_id: email,
    $email: email,
    $first_name: firstName,
    $last_name: lastName,
  });
}

export function registerEvent(properties) {
  registerSuperProperties(properties);

  Mixpanel.track('Create an account', properties);
}

export function loginEvent() {
  Mixpanel.track('Log-in');
}

export function publishReviewEvent({ country, timeSpent, categories }) {
  Mixpanel.trackWithProperties('Publish Review', {
    Country: country,
    'Time spent till publish': timeSpent,
    categories,
  });
}

export function addFriendsEvent({ nbFriends, nbIncomings, nbOutgoings }) {
  Mixpanel.trackWithProperties('Add Friends', {
    '# of friends': nbFriends,
    '# of incoming requests': nbIncomings,
    '# of outgoing requests': nbOutgoings,
  });
}

export function inviteFriendsEvent({ sharedFrom }) {
  Mixpanel.trackWithProperties('Add Friends', {
    'Method of invitation': sharedFrom,
  });
}

export default Mixpanel;
