import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      // <nav>
      //   <h2 className="shadowed upper">Hitch a Ride!</h2>
      // </nav>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo center">Hitch a Ride!</a>
          <a href="#" data-activates="sidebar" className="button-collapse"><i className="material-icons">menu</i></a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
