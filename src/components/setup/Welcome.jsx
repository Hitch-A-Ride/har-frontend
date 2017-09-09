import React from 'react';

import { CarouselItem } from 'app/components/common/PopUpCarousel';

export default ({ name }) => (
  <CarouselItem title="Welcome!" className="centered active" name={name}>
    <div className="centered-container">
      <h5>Hitch a ride is an app that helps to connect Andelans who are car owners with other Andelans heading towards the same route as they are, offering free rides in exchange for company and great conversation.</h5>
      <h4>Glad to have you on board!</h4>
    </div>
  </CarouselItem>
);

