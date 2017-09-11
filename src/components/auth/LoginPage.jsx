import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginButton from './LoginButton';

class LoginPage extends React.Component {
  render() {
    if (this.props.isAuthenticated) return <Redirect push to="/" />;
    return (
      <div className="centered-container">
        <LoginButton />
      </div>
    );
  }
}

export default LoginPage;
