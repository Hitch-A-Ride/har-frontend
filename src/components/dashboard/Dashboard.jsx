import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signOut } from 'app/actions/authActions';

import Map from 'app/components/location/Map';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  onSignOutClick(event) {
    event.preventDefault();
    this.props.signOut();
  }

  render() {
    if (!this.props.isAuthenticated) return <Redirect push to="/login" />;
    const { user } = this.props;
    return (
      <div className="centered-container">
        <h1>Hi, {`${user.firstName} ${user.lastName}!`}</h1>
        <br />
        <h4>This app is still under construction</h4>
        <br />
        <Map id="sample-map" />
        <br />
        <button id="signout-button" className="btn" onClick={this.onSignOutClick}>
          Sign Out
        </button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
