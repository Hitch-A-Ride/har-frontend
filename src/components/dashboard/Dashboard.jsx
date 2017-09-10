import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import { postRide } from 'app/actions/destinationActions';
import { signOut } from 'app/actions/authActions';
import * as Firebase from 'app/services/firebase';
import CreateRide from './CreateRide';
import DashHome from './DashHome';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: ''
    };
    this.onSignOutClick = this.onSignOutClick.bind(this);
    this.shouldShowSetup = this.shouldShowSetup.bind(this);
    this.onChange = this.onChange.bind(this);
    this.postRide = this.postRide.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: false, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: false, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: () => { } // Function for after opening timepicker
    });
    if (this.shouldShowSetup()) {
      $('#setup-modal').modal('open');
    }
  }

  onSignOutClick(event) {
    event.preventDefault();
    this.props.signOut();
  }

  onChange(event) {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }

  postRide() {
    const ride = {
      destination: this.state.destination,
      seats: this.state.seats,
      time: this.state.timepicker
    };
    this.props.postRide(ride);
  }

  shouldShowSetup() {
    const { uid } = this.props;
    return this.props.isAuthenticated && Firebase.isNewUser();
  }

  render() {
    if (!this.props.isAuthenticated) return <Redirect push to="/login" />;
    const { displayName, uid } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${this.props.match.url}`}
          render={() => (
            <DashHome displayName={displayName} uid={uid} onSignOutClick={this.onSignOutClick} shouldShowSetup={this.shouldShowSetup} />
          )}
        />
        <Route
          exact
          path="/add-ride"
          render={() => (<CreateRide onChange={this.onChange} value={this.state.destination} postRide={this.postRide} />)}
        />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  postRide: ride => dispatch(postRide(ride)),
});

export default connect(undefined, mapDispatchToProps)(Dashboard);
