import React from 'react';

import Map from './Map';

const LocationPicker = ({ mapId, mapClass, position, title, onMapClick }) => (
  <div className="card flex location-picker">
    <div className="card-content">
      <span className="card-title">{title || 'Location Picker'}</span>
      <div className="centered-container">
        <Map id={mapId} className={mapClass} position={position} onClick={onMapClick} />
      </div>
    </div>
  </div>
);

LocationPicker.defaultProps = {
  mapClass: 'medium'
};

export default LocationPicker;
