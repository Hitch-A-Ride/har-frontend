import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import 'app/sass/app.scss';
import store from 'app/store';
import App from 'app/components/App';

if (process.env.NODE_ENV === 'production') {
  const OfflinePluginRuntime = require('offline-plugin/runtime');

  OfflinePluginRuntime.install({
    onUpdating: () => {
      console.log('ServiceWorker is updating');
    },
    onUpdateReady: () => {
      console.log('ServiceWorker update is ready');
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdated: () => {
      console.log('ServiceWorker has updated');
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.log('ServiceWorker update failed');
    },
  });
}

if (module.hot) {
  module.hot.accept();
}

const startApp = (AppComponent) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AppComponent />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
};

gapi.load('auth2', () => {
  gapi.auth2.init({
    client_id: CLIENT_ID,
    cookiepolicy: 'single_host_origin',
  }).then(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    startApp(App);
  });
});
