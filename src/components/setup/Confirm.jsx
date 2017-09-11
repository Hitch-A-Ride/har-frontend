import React from 'react';

import { CarouselItem } from 'app/components/common/PopUpCarousel';

const Confirm = ({ closeModal }) => (
  <CarouselItem title="You're good to go!" className="centered">
    <div className="centered-container">
      <h5>You can create rides, view your ride history and more!</h5>
    </div>
    <div className="card-carousel-action">
      <button className="btn-flat" onClick={closeModal}>Yay!</button>
    </div>
  </CarouselItem>
);

export default Confirm;
