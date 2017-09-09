import { promise } from 'app/actions/actionTypes';
import * as googleService from 'app/services/googleauth';
import * as firebaseService from 'app/services/firebase';

export const signIn = () => ({
  type: promise.SIGNIN,
  payload: new Promise((resolve, reject) => {
    googleService.signIn().then(({ profile, token }) => {
      firebaseService.signIn(token).then((userId) => {
        resolve({ ...profile, userId });
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  })
});

export const silentSignIn = () => ({
  type: promise.SIGNIN,
  payload: new Promise((resolve, reject) => {
    googleService.silentSignIn().then(({ profile, token }) => {
      firebaseService.signIn(token).then((userId) => {
        resolve({ ...profile, userId });
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  })
});

export const signOut = () => ({
  type: promise.SIGNOUT,
  payload: new Promise((resolve, reject) => {
    firebaseService.signOut().then(() => {
      googleService.signOut().then(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    }, (error) => {
      reject(error);
    });
  })
});
