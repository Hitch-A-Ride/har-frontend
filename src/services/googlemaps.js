const defaultPosition = {
  lat: 6.506,
  lng: 3.384,
};

export const zoomLevel = {
  world: 1,
  landmass: 5,
  city: 10,
  street: 15,
  building: 20
};

export const areaLevel = [
  'neighborhood',
  'sublocality',
  'locality',
];

export const getCurrentPosition = () => (
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => {
        reject({ hasGeolocation: true });
      });
    } else {
      reject({ hasGeolocation: false });
    }
  })
);

export const moveMapToPosition = (map, position) => {
  map.setCenter(position);
};

const placeMarker = (position, map, marker) => {
  if (marker) marker.setMap(null);
  map.setCenter(position);
  return new google.maps.Marker({ position, map });
};

export const geocode = location => (
  new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      location
    }, (results, status) => {
      console.log(results);
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        resolve(results[0]);
      } else {
        reject();
      }
    });
  })
);

const filterAddressComponents = (addressComponents) => {
  let country;
  let area;
  let neighborhood;

  addressComponents.forEach((component) => {
    if (component.types.indexOf('country') > -1) {
      country = component.long_name;
    }
    if (component.types.indexOf('sublocality') > -1) {
      area = component.long_name;
    }
    if (component.types.indexOf('neighborhood') > -1) {
      neighborhood = component.long_name;
    }
  });

  return { country, area, neighborhood };
};

export const getArea = location => (
  new Promise((resolve, reject) => {
    geocode(location).then((geoCodeResult) => {
      const address = filterAddressComponents(geoCodeResult.address_components);
      if (!address.country || !address.area || !address.neighborhood) {
        Materialize.toast('An error occurred while parsing your destination', 2000, 'red');
        reject();
      } else {
        resolve(address);
      }
    }, () => {
      Materialize.toast('An error occurred while parsing your destination', 2000, 'red');
      reject();
    });
  })
);

export const displayMap = (elementId, onClick, position) => {
  const map = new google.maps.Map(document.getElementById(elementId), {
    center: position || defaultPosition,
    zoom: zoomLevel.street
  });
  let marker = placeMarker(position || defaultPosition, map);
  if (!position) {
    getCurrentPosition().then((currentPosition) => {
      marker = placeMarker(currentPosition, map, marker);
    }, (error) => {
      Materialize.toast(
        error.hasGeolocation ? "We couldn't determine your location" : "Your browser doesn't support geolocation",
        2000,
        'red'
      );
    });
  }

  map.addListener('click', (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };

    onClick(newPosition);

    marker = placeMarker(newPosition, map, marker);
  });
};

export const displayCurrentLocation = (elementId, onClick) => {
  displayMap(elementId, onClick);
};
