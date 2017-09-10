import { data } from 'app/actions/actionTypes';

export const register = (store, uid) => {
  const myDestinationsRef = firebase.database().ref(`/users/${uid}/destinations`);
  const myDefaultsRef = firebase.database().ref(`/users/${uid}/defaults`);
  const myProfileRef = firebase.database().ref(`/users/${uid}/profile`);

  myDestinationsRef.on('value', (snapshot) => {
    store.dispatch({
      type: data.MY_DESTINATIONS,
      payload: snapshot.val()
    });
  });

  myDefaultsRef.on('value', (snapshot) => {
    store.dispatch({
      type: data.DEFAULTS,
      payload: snapshot.val()
    });
  });

  myProfileRef.on('value', (snapshot) => {
    store.dispatch({
      type: data.MY_PROFILE,
      payload: snapshot.val()
    });
  });
};

export const unregister = (uid) => {
  firebase.database().ref(`/users/${uid}/destinations`).off();
  firebase.database().ref(`/users/${uid}/defaults`).off();
  firebase.database().ref(`/users/${uid}/profile`).off();
};
