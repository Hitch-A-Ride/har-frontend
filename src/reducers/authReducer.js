import { auth } from 'app/store/initialState';
import { data } from 'app/actions/actionTypes';

export default (state = auth, action = {}) => {
  switch (action.type) {
    case 'SIGNIN_PENDING':
      return {
        ...state,
        authInProgress: true,
      };
    case 'SIGNIN_FULFILLED':
      return {
        ...state,
        isAuthenticated: true,
        authInProgress: false,
      };
    case data.MY_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case 'SIGNIN_REJECTED':
    case 'SIGNOUT_FULFILLED':
      return {
        isAuthenticated: false,
        authInProgress: false,
      };
    default:
      return state;
  }
};
