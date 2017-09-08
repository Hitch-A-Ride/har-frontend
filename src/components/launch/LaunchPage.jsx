import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LaunchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }

  componentDidMount() {
    this.redirectTimeout = window.setTimeout(() => {
      this.redirect();
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimeout);
  }

  onClick = () => {
    this.redirect();
  }

  redirect = () => {
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    if (this.state.shouldRedirect) {
      if (this.props.isAuthenticated) {
        return <Redirect push={true} to="/dashboard" />;
      } else {
        return <Redirect push={true} to="/login" />;
      }
    } else {
      return (
        <div className="centered-container" onClick={this.onClick}>
          <h4>Welcome to Hitch-A-Ride!</h4>
        </div>
      );
    }
  }
}

export default LaunchPage;
