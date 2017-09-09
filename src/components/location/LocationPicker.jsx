import React, { Component } from 'react';

import Map from './Map';

class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: this.props.destination
    };
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onMapClick(destination) {
    this.setState({ destination });
  }

  onSaveClick(event) {
    console.log('Hey');
    event.preventDefault();
    if (this.state.destination) {
      this.props.onSave(this.state.destination);
    }
  }

  onCancelClick(event) {
    event.preventDefault();
    this.props.onCancel();
  }

  render() {
    const { mapId, mapClass, destination, title } = this.props;
    return (
      <div className="card flex location-picker">
        <div className="card-content">
          <span className="card-title">{title || 'Location Picker'}</span>
          <Map id={mapId} className={mapClass} position={destination && destination.position} onClick={this.onMapClick} />
        </div>
        <div className="card-action">
          <a href="#!" className="btn" onClick={this.onSaveClick}>Save</a>
          <a href="#!" className="btn" onClick={this.onCancelClick}>Cancel</a>
        </div>
      </div>
    );
  }
}

LocationPicker.defaultProps = {
  mapClass: 'medium'
};

export default LocationPicker;
