export const signIn = googleIDToken => (
  new Promise((resolve, reject) => {
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleIDToken))
      .then((result) => {
        resolve(result.uid);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  })
);

export const signOut = () => (
  new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  })
);

export const isNewUser = userId => (
  new Promise((resolve) => {
    firebase.database().ref(`/users/${userId}`).on('value', (snap) => {
      if (!snap.exists()) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  })
);

export const addDestination = (userId, destination, isDefault) => (
  new Promise((resolve, reject) => {
    const destinationRef = firebase.database().ref('/destinations').push();
    destinationRef.set(destination).then(() => {
      firebase.database().ref(`/users/${userId}/destinations`).push()
        .set(destinationRef.key)
        .then(() => {
          if (isDefault) {
            firebase.database().ref(`/users/${userId}/profile/defaultDestination`).set(destinationRef.key)
              .then(() => {
                Materialize.toast('Default destination added successfully!', 2000, 'grey darken-4');
              }, (error) => {
                Materialize.toast('An error occurred while saving your destination', 2000, 'red');
                reject(error);
              });
          } else {
            Materialize.toast('Destination added successfully!', 2000, 'grey darken-4');
          }
          resolve();
        }, (error) => {
          Materialize.toast('An error occurred while saving your destination', 2000, 'red');
          reject(error);
        });
    }, (error) => {
      Materialize.toast('An error occurred while saving your destination', 2000, 'red');
      reject(error);
    });
  })
);
