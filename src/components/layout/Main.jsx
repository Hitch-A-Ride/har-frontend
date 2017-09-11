import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LoginPage from 'app/components/auth/LoginPage';
import Dashboard from 'app/components/dashboard/Dashboard';
import Preloader from 'app/components/common/Preloader';

class Main extends Component {
  route(Page) {
    const { authInProgress, uid, isAuthenticated } = this.props;
    if (authInProgress || (!uid && isAuthenticated)) {
      return (
        <div className="centered-container">
          <Preloader />
        </div>
      );
    }
    return <Page {...this.props} />;
  }

  render() {
    const DashboardRoute = this.route.bind(this, Dashboard);
    const LoginRoute = this.route.bind(this, LoginPage);
    return (
      <Switch>
        <Route exact path="/login" render={LoginRoute} />
        <Route path="/" render={DashboardRoute} />
      </Switch>
    );
  }
}

export default withRouter(Main);
