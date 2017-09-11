import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createRide } from 'app/actions/rideActions';
import RideForm from 'app/components/rides/RideForm';

const destinations = {
  1: 'Yaba',
  2: 'Ojuelegba',
  3: 'Sabo'
};

class NewRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      time: '',
      seats: 1,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(changes) {
    this.setState(changes);
  }

  onSubmit() {
    this.setState({
      time: $('#new-ride-form #ride-time').val()
    }, () => {
      if (this.state.time && this.state.seats && this.state.destination) {
        this.props.createRide(this.state);
      } else {
        console.log(this.state);
        Materialize.toast('Please fill in all options', 2000, 'red');
      }
    });
  }

  render() {
    return (
      <div className="centered-container">
        <h2>Create Ride Request</h2>
        <RideForm id="new-ride-form" onChange={this.onChange} rideOptions={this.state} destinations={destinations} />
        <div className="view-action">
          <button className="btn" onClick={this.onSubmit}>Broadcast</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createRide: ride => dispatch(createRide(ride)),
});

export default connect(undefined, mapDispatchToProps)(NewRide);
