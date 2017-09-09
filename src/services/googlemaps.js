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

export const displayMap = (elementId, position) => {
  const map = new google.maps.Map(document.getElementById(elementId), {
    center: defaultPosition,
    zoom: zoomLevel.street
  });
  if (position) {
    moveMapToPosition(map, position);
  } else {
    getCurrentPosition().then((currentPosition) => {
      position = currentPosition;
      moveMapToPosition(map, position);
    }, (error) => {
      const infoWindow = new google.maps.InfoWindow();
      infoWindow.setPosition(defaultPosition);
      infoWindow.setContent(error.hasGeolocation
        ? "We couldn't determine your location"
        : "Your browser doesn't support geolocation"
      );
      infoWindow.open(map);
    });
  }
  const marker = new google.maps.Marker({
    position: position || defaultPosition,
    map,
    draggable: true
  });
};
