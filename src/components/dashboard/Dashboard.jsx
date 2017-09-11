import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';

import * as Firebase from 'app/services/firebase';
import NewRide from './NewRide';
import Home from './Home';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.showSetupIfNew = this.showSetupIfNew.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
    this.showSetupIfNew();
  }

  showSetupIfNew() {
    Firebase.isNewUser(this.props.uid).then((isNew) => {
      if (isNew) {
        $('#setup-modal').modal('open');
      }
    });
  }

  render() {
    if (!this.props.isAuthenticated) return <Redirect push to="/login" />;
    const { displayName, uid } = this.props;
    return (
      <Switch>
        <Route exact path="/" render={() => <Home displayName={displayName} uid={uid} />} />
        <Route exact path="/new-ride" render={() => (<NewRide />)} />
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  postRide: ride => dispatch(postRide(ride)),
});

export default Dashboard;
