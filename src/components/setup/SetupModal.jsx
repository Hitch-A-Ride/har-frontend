import React, { Component } from 'react';

import { PopUpCarousel } from 'app/components/common/PopUpCarousel';
import Welcome from './Welcome';
import SelectHome from './SelectHome';

class SetupModal extends Component {
  componentDidMount() {
    $('.modal').modal();
  }

  render() {
    return (
      <PopUpCarousel id="setup-carousel" modalId="setup-modal">
        <Welcome name="1" />
        <SelectHome uid={this.props.uid} name="2" />
      </PopUpCarousel>
    );
  }
}

export default SetupModal;
