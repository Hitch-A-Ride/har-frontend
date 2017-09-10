import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LoginPage from 'app/components/auth/LoginPage';
import Dashboard from 'app/components/dashboard/Dashboard';
import Preloader from 'app/components/common/Preloader';

class Main extends Component {
  route(Page) {
    if (this.props.authInProgress) {
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
        <Route exact path="/" render={this.route.bind(this, Dashboard)} />
        <Route exact path="/login" render={this.route.bind(this, LoginPage)} />
      </Switch>
    );
  }
}

export default withRouter(Main);
