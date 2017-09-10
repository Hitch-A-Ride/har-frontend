import * as GoogleMaps from 'app/services/googlemaps';
import * as Firebase from 'app/services/firebase';
import { promise } from 'app/actions/actionTypes';

export const addDestination = (uid, position, isDefault) => ({
  type: promise.ADD_DESTINATION,
  payload: new Promise((resolve, reject) => {
    GoogleMaps.getArea(position)
      .then((address) => {
        const destination = { address, position };
        Firebase.addDestination(uid, destination, isDefault)
          .then(() => {
            resolve();
          }, (error) => {
            reject(error);
          });
      }, (error) => {
        reject(error);
      });
  })
});

export const postRide = ride => ({
  type: 'POST_RIDE',
  payload: ride,
});

export const editDestination = () => ({});
