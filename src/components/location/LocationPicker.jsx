import React, { Component } from 'react';

import Map from './Map';

class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.destination;
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onMapClick(position) {
    this.setState({ position });
  }

  onSaveClick(event) {
    event.preventDefault();
    if (this.state.position) {
      this.props.onSave(this.state.position);
    }
  }

  onCancelClick(event) {
    event.preventDefault();
    this.props.onCancel();
  }

  render() {
    const { mapId, mapClass, position, title } = this.props;
    return (
      <div className="card flex location-picker">
        <div className="card-content">
          <span className="card-title">{title || 'Location Picker'}</span>
          <Map id={mapId} className={mapClass} position={position} onClick={this.onMapClick} />
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
