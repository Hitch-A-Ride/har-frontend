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

export const getArea = (location) => {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    location
  }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log(results);
      console.log(results[0]);
      console.log(results[0].formatted_address);
    }
  });
};

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

    getArea(newPosition);

    onClick({
      position: newPosition
    });

    marker = placeMarker(newPosition, map, marker);
  });
};

export const displayCurrentLocation = (elementId, onClick) => {
  displayMap(elementId, onClick);
};
