import { auth } from 'app/store/initialState';

export default (state = auth, action = {}) => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'SIGNOUT_SUCCESS':
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
