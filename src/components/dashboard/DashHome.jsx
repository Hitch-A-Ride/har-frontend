import React from 'react';
import SetupModal from 'app/components/setup/SetupModal';

const DashHome = ({ displayName, onSignOutClick, uid, shouldShowSetup }) => (
  <div className="centered-container">
    <h1>Hi, {displayName}!</h1>
    <br />
    <h4>This app is still under construction</h4>
    <br />
    <a id="create-ride" className="btn" href="/add-ride" >
      Create Ride
    </a>
    <br />
    <button id="signout-button" className="btn" onClick={onSignOutClick}>
      Sign Out
    </button>
    {shouldShowSetup() && <SetupModal uid={uid} />}
  </div>
);


export default DashHome;
