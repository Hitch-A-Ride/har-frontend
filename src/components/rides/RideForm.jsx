import React, { Component } from 'react';

import Select from 'app/components/common/Select';

class RideForm extends Component {
  componentDidMount() {
    const { time } = this.props.rideOptions;
    $('.timepicker').pickatime({
      default: time || 'now',
      fromnow: 1800000,
      twelvehour: false,
      donetext: 'Select',
      cleartext: 'Clear',
      canceltext: 'Cancel',
      autoclose: false,
    });
  }

  render() {
    const { id, className, onChange, rideOptions, destinations } = this.props;
    return (
      <div id={id} className={className ? `row view ${className}` : 'row view'}>
        <form className="col s12">
          <div className="row">
            <Select
              id="ride-destination"
              name="destination"
              label="Destination"
              className="input-field col offset-m2 m6 s9"
              options={destinations}
              onChange={onChange}
              value={rideOptions.destination}
            />
            <div className="input-field col m2 s3">
              <button className="btn btn-flat full">Add Location</button>
            </div>
          </div>
          <div className="row">
            <Select
              id="ride-seats"
              name="seats"
              label="Available seats"
              className="input-field col offset-m2 m3 s5"
              options={[1, 2, 3, 4, 5, 6]}
              onChange={onChange}
              value={rideOptions.seats}
            />
            <div className="input-field col offset-s2 offset-m2 m3 s5">
              <input
                id="ride-time"
                name="time"
                type="text"
                className="timepicker"
              />
              <label htmlFor="ride-time">Departure Time</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RideForm;
