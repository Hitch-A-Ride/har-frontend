import React, { Component } from 'react';
import { connect } from 'react-redux';

import LocationPicker from 'app/components/location/LocationPicker';
import { CarouselItem } from 'app/components/common/PopUpCarousel';
import { addDestination } from 'app/actions/destinationActions';

const onCancel = () => {
  $('#setup-modal').modal('close');
};

class SelectHome extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  onSave(homeLocation) {
    this.props.addDestination(this.props.uid, homeLocation, true);
  }

  render() {
    return (
      <CarouselItem manual name={this.props.name}>
        <LocationPicker mapId="setup-select-home" title="Choose your home destination" onSave={this.onSave} onCancel={onCancel} />
      </CarouselItem>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addDestination: (uid, position, isDefault) => dispatch(addDestination(uid, position, isDefault))
});

export default connect(undefined, mapDispatchToProps)(SelectHome);
