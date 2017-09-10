import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import 'app/sass/app.scss';
import store from 'app/store';
import * as Firebase from 'app/services/firebase';
import * as DataService from 'app/services/data';
import App from 'app/components/App';

// if (process.env.NODE_ENV === 'production') {
//   const OfflinePluginRuntime = require('offline-plugin/runtime');

//   OfflinePluginRuntime.install({
//     onUpdating: () => {
//       console.log('ServiceWorker is updating');
//     },
//     onUpdateReady: () => {
//       console.log('ServiceWorker update is ready');
//       OfflinePluginRuntime.applyUpdate();
//     },
//     onUpdated: () => {
//       console.log('ServiceWorker has updated');
//       window.location.reload();
//     },
//     onUpdateFailed: () => {
//       console.log('ServiceWorker update failed');
//     },
//   });
// }

if (module.hot) {
  module.hot.accept();
}

Firebase.init();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

Firebase.registerAuth(store)
  .then((uid) => {
    DataService.register(store, uid);
  })
  .catch(() => {
    // Nothing to do here
  });
