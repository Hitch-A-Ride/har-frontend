import { ride } from 'app/store/initialState';

export default (state = ride, action = {}) => {
  switch (action.type) {
    case 'POST_RIDE':
      return {
        ...state,
        rideInProgress: true,
      };
    default:
      return state;
  }
};
