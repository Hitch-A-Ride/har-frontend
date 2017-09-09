import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { silentSignIn } from 'app/actions/authActions';
import Navbar from 'app/components/layout/Navbar';
import Main from 'app/components/layout/Main';

class App extends Component {
  componentDidMount() {
    this.props.silentSignIn();
  }

  render() {
    return (
      <div className="root">
        <Navbar {...this.props} />
        <div className="main">
          <Main {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (state.auth);

const mapDispatchToProps = dispatch => ({
  silentSignIn: () => dispatch(silentSignIn())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

