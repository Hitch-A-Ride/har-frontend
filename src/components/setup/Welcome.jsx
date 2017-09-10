import React from 'react';

import { CarouselItem } from 'app/components/common/PopUpCarousel';

export default ({ nextItem, lastItem }) => (
  <CarouselItem title="Welcome!" className="centered active">
    <div className="centered-container">
      <h5>Hitch a ride is an app that helps to connect Andelans who are car owners with other Andelans heading towards the same route as they are, offering free rides in exchange for company and great conversation.</h5>
      <h5>Would you like to set your defaults now?</h5>
    </div>
    <div className="card-carousel-action">
      <button className="btn-flat" onClick={lastItem}>Nah, later</button>
      <button className="btn-flat" onClick={nextItem}>Sure!</button>
    </div>
  </CarouselItem>
);

