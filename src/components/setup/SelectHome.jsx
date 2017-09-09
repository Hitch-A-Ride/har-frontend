import React, { Component } from 'react';

import LocationPicker from 'app/components/location/LocationPicker';
import { CarouselItem } from 'app/components/common/PopUpCarousel';
import { addDestination } from 'app/services/firebase';

const onCancel = () => {
  $('#setup-modal').modal('close');
};

class SelectHome extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  onSave(homeLocation) {
    console.log(homeLocation);
    addDestination(this.props.userId, homeLocation, true)
      .then(() => {
        $('#setup-modal').modal('close');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <CarouselItem manual name={this.props.name}>
        <LocationPicker mapId="setup-select-home" title="Choose your home destination" onSave={this.onSave} onCancel={onCancel} />
      </CarouselItem>
    );
  }
}

export default SelectHome;
