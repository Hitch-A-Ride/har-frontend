import { promise } from 'app/actions/actionTypes';

const getUserProfile = (googleUser) => {
  const profile = googleUser.getBasicProfile();
  return {
    firstName: profile.getGivenName(),
    lastName: profile.getFamilyName(),
    avatar: profile.getImageUrl(),
    email: profile.getEmail()
  };
};

export const signIn = () => ({
  type: promise.SIGNIN,
  payload: (new Promise((resolve, reject) => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signIn().then((googleUser) => {
      resolve(getUserProfile(googleUser));
    }, (err) => {
      reject(err);
    });
  }))
});

export const silentSignIn = () => {
  const googleAuth = gapi.auth2.getAuthInstance();
  return {
    type: promise.SIGNIN,
    payload: googleAuth.currentUser.get(),
    payload: (new Promise((resolve, reject) => {
      const googleAuth = gapi.auth2.getAuthInstance();
      try {
        resolve(getUserProfile(googleAuth.currentUser.get()));
      } catch (err) {
        reject(err);
      }
    }))
  }
};

export const signOut = () => ({
  type: promise.SIGNOUT,
  payload: (new Promise((resolve, reject) => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(() => {
      resolve();
    }, (err) => {
      reject(err);
    });
  }))
});
