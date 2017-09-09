import { ride } from 'app/store/initialState';

export default (state = ride, action = {}) => {
  switch (action.type) {
    case 'NEW_RIDE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};