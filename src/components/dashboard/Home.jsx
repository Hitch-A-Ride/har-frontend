import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from 'app/actions/authActions';
import * as Firebase from 'app/services/firebase';
import SetupModal from 'app/components/setup/SetupModal';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
    this.showSetupIfNew = this.showSetupIfNew.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
  }

  onSignOutClick(event) {
    event.preventDefault();
    this.props.signOut();
  }

  showSetupIfNew() {
    Firebase.isNewUser(this.props.uid).then((isNew) => {
      if (isNew) {
        $('#setup-modal').modal('open');
      }
    });
  }

  render() {
    const { displayName, uid } = this.props;
    return (
      <div className="centered-container">
        <h1>Hi, {displayName}!</h1>
        <br />
        <h4>This app is still under construction</h4>
        <br />
        <Link id="create-ride" className="btn" to="/new-ride">Create Ride</Link>
        <br />
        <button id="signout-button" className="btn" onClick={this.onSignOutClick}>
          Sign Out
        </button>
        <SetupModal uid={uid} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(undefined, mapDispatchToProps)(HomePage);
