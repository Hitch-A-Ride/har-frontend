import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signOut } from 'app/actions/authActions';
import * as Firebase from 'app/services/firebase';
import SetupModal from 'app/components/setup/SetupModal';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
    this.shouldShowSetup = this.shouldShowSetup.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
    if (this.shouldShowSetup()) {
      $('#setup-modal').modal('open');
    }
  }

  onSignOutClick(event) {
    event.preventDefault();
    this.props.signOut();
  }

  shouldShowSetup() {
    const { uid } = this.props;
    return this.props.isAuthenticated && Firebase.isNewUser();
  }

  render() {
    if (!this.props.isAuthenticated) return <Redirect push to="/login" />;
    const { displayName, uid } = this.props;
    return (
      <div className="centered-container">
        <h1>Hi, {displayName}!</h1>
        <br />
        <h4>This app is still under construction</h4>
        <br />
        <button id="signout-button" className="btn" onClick={this.onSignOutClick}>
          Sign Out
        </button>
        {this.shouldShowSetup() && <SetupModal uid={uid} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(undefined, mapDispatchToProps)(Dashboard);
