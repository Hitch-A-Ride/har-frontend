import React, { Component } from 'react';

import { PopUpCarousel, CarouselItem } from 'app/components/common/PopUpCarousel';
import Welcome from './Welcome';
import SelectHome from './SelectHome';

const onCancel = () => {
  $('#setup-modal').modal('close');
};

class SetupModal extends Component {
  componentDidMount() {
    $('.modal').modal();
  }

  render() {
    return (
      <PopUpCarousel id="setup-carousel" modalId="setup-modal">
        <Welcome name="1" />
        <SelectHome userId={this.props.userId} name="2" />
      </PopUpCarousel>
    );
  }
}

export default SetupModal;
