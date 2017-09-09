import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LoginPage from 'app/components/auth/LoginPage';
import Dashboard from 'app/components/dashboard/Dashboard';
import LaunchPage from 'app/components/launch/LaunchPage';

class Main extends Component {
  route(Component) {
    return <Component {...this.props} />;
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" render={this.route.bind(this, LaunchPage)} />
        <Route exact={true} path="/login" render={this.route.bind(this, LoginPage)} />
        <Route exact={true} path="/dashboard" render={this.route.bind(this, Dashboard)} />
      </Switch>
    );
  }
}

export default withRouter(Main);
