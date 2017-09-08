/* eslint global-require: "off" */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

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

const startApp = (AppComponent) => {
  ReactDOM.render(
    <AppComponent />,
    document.getElementById('root'),
  );
};

startApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { startApp(require('./components/App')); });
}
