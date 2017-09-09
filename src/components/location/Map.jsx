import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as GoogleMaps from 'app/services/googlemaps';

class Map extends Component {
  constructor(props) {
    super(props);
    this.renderMap = this.renderMap.bind(this);
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap() {
    const { id, onClick, position } = this.props;
    GoogleMaps.displayMap(id, onClick, position);
  }

  render() {
    return (
      <div id={this.props.id} className={`map ${this.props.className}`} />
    );
  }
}

Map.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  position: PropTypes.object,
};

Map.defaultProps = {
  className: 'medium',
  onClick: e => console.log(e.latLng.lat(), e.latLng.lng()),
  position: GoogleMaps.defaultPosition,
};

export default Map;
