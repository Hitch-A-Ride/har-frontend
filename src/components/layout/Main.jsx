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
    return (
      <Switch>
        <Route path="/" render={this.route.bind(this, Dashboard)} />
        <Route path="/login" render={this.route.bind(this, LoginPage)} />
      </Switch>
    );
  }
}

export default withRouter(Main);
