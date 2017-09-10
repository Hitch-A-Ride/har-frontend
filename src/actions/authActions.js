import { promise } from 'app/actions/actionTypes';
import * as Firebase from 'app/services/firebase';

export const signIn = () => ({
  type: promise.SIGNIN,
  payload: new Promise((resolve, reject) => {
    Firebase.signIn().then(() => {
      resolve();
    }, (error) => {
      reject(error);
    });
  })
});

export const signOut = () => ({
  type: promise.SIGNOUT,
  payload: new Promise((resolve, reject) => {
    Firebase.signOut().then(() => {
      resolve();
    }, (error) => {
      reject(error);
    });
  })
});
