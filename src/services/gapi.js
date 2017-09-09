const getUserData = (googleUser) => {
  const googleProfile = googleUser.getBasicProfile();
  return {
    profile: {
      firstName: googleProfile.getGivenName(),
      lastName: googleProfile.getFamilyName(),
      avatar: googleProfile.getImageUrl(),
      email: googleProfile.getEmail()
    },
    token: googleUser.getAuthResponse().id_token
  };
};

export const signIn = () => (
  new Promise((resolve, reject) => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signIn().then((googleUser) => {
      resolve(getUserData(googleUser));
    }, (err) => {
      reject(err);
    });
  })
);

export const silentSignIn = () => (
  new Promise((resolve, reject) => {
    const googleAuth = gapi.auth2.getAuthInstance();
    try {
      resolve(getUserData(googleAuth.currentUser.get()));
    } catch (err) {
      reject(err);
    }
  })
);

export const signOut = () => (
  new Promise((resolve, reject) => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(() => {
      resolve();
    }, (err) => {
      reject(err);
    });
  })
);
