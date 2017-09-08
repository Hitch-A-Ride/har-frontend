import { auth } from 'app/store/initialState';

export default (state = auth, action = {}) => {
  switch (action.type) {
    case 'SIGNIN_FULFILLED':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case 'SIGNOUT_FULFILLED':
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
