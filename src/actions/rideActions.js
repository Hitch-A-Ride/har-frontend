import { promise } from './actionTypes';

export const createRide = ride => ({
  type: 'POST_RIDE',
  payload: ride,
});
