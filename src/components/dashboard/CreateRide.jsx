import React from 'react';

const CreateRide = ({ onChange, value, postRide }) => (
  <div className="create-ride">
    <h2 className="center"> Create Ride Request </h2>
    <div className="row">
      <div className="input-field col s12">
        <input
          name="timepicker"
          type="text"
          className="timepicker"
          onChange={onChange}
        />
        <label htmlFor="departuretime">Departure Time</label>
      </div>
      <div id="seats" className="input-field col s12">
        <div className="col s4">
          <h4 className="left">Seats</h4>
        </div>
        <div className="col s8">
          <select name="seats" className=" input-field select" onChange={onChange}>
            <option value="0" disabled selected>0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
      <div className="input-field col s12">
        <input value={value} name="destination" id="destination" type="text" className="validate" onChange={onChange} />
        <label htmlFor="destination">Destination</label>
        <p>Choose another destination</p>
      </div>
    </div>
    <button className="btn cyan accent-4" onClick={postRide} >
      Broadcast
    </button>
  </div>
);

export default CreateRide;
