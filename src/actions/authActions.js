import * as Firebase from 'app/services/firebase';
import { promise } from './actionTypes';

export const signIn = () => ({
  type: promise.SIGNIN,
  payload: Firebase.signIn()
});

export const signOut = () => ({
  type: promise.SIGNOUT,
  payload: Firebase.signOut()
});

export const saveProfile = (uid, profileDetails) => ({
  type: promise.SAVE_PROFILE,
  payload: Firebase.saveProfile(uid, profileDetails)
});
