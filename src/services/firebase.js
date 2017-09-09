export const signIn = googleIDToken => (
  new Promise((resolve, reject) => {
    firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(googleIDToken))
      .then(() => {
        resolve();
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
