import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signOut } from '../../actions/authActions';
import { postRide } from '../../actions/rideActions';
import Ride from 'app/components/dashboard/Ride';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      stops: '',
      seats: 0
    }
    this.onSignOutClick = this.onSignOutClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.postRide = this.postRide.bind(this);
  }

  // componentDidMount() {
  //   this.initMap();
  // }

  initMap() {
    let map, infoWindow;
    const latlng = new google.maps.LatLng(-34.397, 150.644);
    map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter(), map);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter(), map);
    }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }


  postRide(event) {
    event.preventDefault();
    const ride = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      destination: this.state.destination,
      seats: this.state.seats,
      stops: this.state.stops
    }
    if (ride.seats !== 0 && ride.destination !== '') {
      this.props.postRide(ride);
    } else {
      console.log('No Ride Yet')
    }
  }
  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }
  onSignOutClick = (event) => {
    event.preventDefault();
    this.props.signOut();
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect push={true} to="/login" />;
    } else {
      const { user } = this.props;
      return (
        <div className="centered-container">
          <h1>Hi, {`${user.firstName} ${user.lastName}!`}</h1>
          <br />
          <h4>This app is still under construction</h4>
          <Ride
          onChange={this.onChange}
          seats={this.state.seats}
          destination={this.state.destination}
          onSubmit={this.postRide} />
          <br />
          <a id="signout-button" className="mui-btn" onClick={this.onSignOutClick}>Sign Out</a>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  postRide: (ride) => dispatch(postRide(ride))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
