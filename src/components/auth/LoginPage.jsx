import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginButton from './LoginButton';

class LoginPage extends React.Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect push={true} to="/dashboard" />;
    } else {
      return (
        <div className="centered-container">
          <LoginButton />
        </div>
      );
    }
  }
}

export default LoginPage;
