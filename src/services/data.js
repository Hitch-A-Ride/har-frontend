import { data } from 'app/actions/actionTypes';

export const register = (store, uid) => {
  const myDestinationsRef = firebase.database().ref(`/users/${uid}/destinations`);
  const defaultDestinationRef = firebase.database().ref(`/users/${uid}/defaultDestination`);
  const myProfileRef = firebase.database().ref(`/users/${uid}/profile`);

  myDestinationsRef.on('value', (snapshot) => {
    store.dispatch({
      type: data.MY_DESTINATIONS,
      payload: snapshot.val()
    });
  });

  defaultDestinationRef.on('value', (snapshot) => {
    store.dispatch({
      type: data.DEFAULT_DESTINATION,
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

export const unregister = () => {

};
