import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signOut } from '../../actions/authActions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.onSignOutClick = this.onSignOutClick.bind(this);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
