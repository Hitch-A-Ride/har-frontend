import React, { Component } from 'react';

import * as GoogleMaps from 'app/services/googlemaps';
import * as Firebase from 'app/services/firebase';

import LocationPicker from 'app/components/location/LocationPicker';
import { CarouselItem } from 'app/components/common/PopUpCarousel';

class SelectHome extends Component {
  constructor(props) {
    super(props);
    this.onMapClick = this.onMapClick.bind(this);
    this.save = this.save.bind(this);
  }

  onMapClick(position) {
    this.setState({ position });
  }

  save() {
    const { position } = this.state;
    if (position) {
      GoogleMaps.getArea(position)
        .then((address) => {
          const destination = { address, position };
          Firebase.addDestination(this.props.uid, destination, true)
            .then(() => {
              this.props.nextItem();
            }, (error) => {
              console.error(error);
            });
        }, (error) => {
          console.error(error);
        });
    } else {
      Materialize.toast('Please select a location', 2000, 'red');
    }
  }

  render() {
    return (
      <CarouselItem manual className="centered">
        <LocationPicker mapId="setup-select-home" title="Choose your home destination" onMapClick={this.onMapClick} />
        <div className="card-carousel-action">
          <button className="btn-flat" onClick={this.save}>Save</button>
        </div>
      </CarouselItem>
    );
  }
}

export default SelectHome;
