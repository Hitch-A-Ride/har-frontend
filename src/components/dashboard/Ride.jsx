import React from 'react';

const Ride = ({ seats, destination, stops, onChange, onSubmit }) => (
  <div className="mui-form">
    <legend>Title</legend>
    <div className="mui-textfield">
      <input name='destination'
      value={destination}
      type="text" placeholder="Destination" onChange={onChange}/>
    </div>
    <div className="mui-textfield">
      <input name='stops'
      value={stops}
      type="text" placeholder="Possibles stops e.g Oshodi, Ikeja-Along" onChange={onChange}/>
    </div>
    <div className="mui-textfield">
      <input name='seats'
      value={seats}
      type="text" placeholder="Number of seats" onChange={onChange}/>
    </div>
    <button className="mui-btn mui-btn--raised" onClick={onSubmit}>Submit</button>
  </div>
);

export default Ride;

