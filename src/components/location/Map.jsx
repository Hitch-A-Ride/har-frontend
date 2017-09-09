import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as GoogleMaps from 'app/services/googlemaps';

class Map extends Component {
  componentDidMount() {
    GoogleMaps.displayMap(this.props.id);
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
};

Map.defaultProps = {
  className: 'medium'
};

export default Map;
