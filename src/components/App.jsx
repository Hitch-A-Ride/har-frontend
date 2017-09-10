import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navbar from 'app/components/layout/Navbar';
import Main from 'app/components/layout/Main';

const App = props => (
  <div className="root">
    <Navbar {...props} />
    <div className="main">
      <Main {...props} />
    </div>
  </div>
);

const mapStateToProps = state => (state.auth);

export default withRouter(connect(mapStateToProps)(App));

