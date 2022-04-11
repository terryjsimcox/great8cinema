import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { AppProvider, FirebaseProvider } from './context';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
