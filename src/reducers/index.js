import { combineReducers } from 'redux';

import auth from './authReducer';
import ride from './rideReducer';

export default combineReducers({
  auth,
  ride,
});
