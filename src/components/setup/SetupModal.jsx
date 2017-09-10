import React, { Component } from 'react';

import { PopUpCarousel } from 'app/components/common/PopUpCarousel';
import Welcome from './Welcome';
import SelectHome from './SelectHome';
import SelectRideDetails from './SelectRideDetails';
import Confirm from './Confirm';

class SetupModal extends Component {
  componentDidMount() {
    $('.modal').modal();
  }

  render() {
    return (
      <PopUpCarousel id="setup-carousel" modalId="setup-modal">
        <Welcome />
        <SelectHome uid={this.props.uid} />
        <SelectRideDetails uid={this.props.uid} />
        <Confirm />
      </PopUpCarousel>
    );
  }
}

export default SetupModal;
