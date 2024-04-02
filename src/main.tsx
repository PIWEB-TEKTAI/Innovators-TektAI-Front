import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import './i18n';
import { AuthProvider } from './components/Auth/AuthProvider';
import { SocketProvider } from './SocketContext';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId="33413435539-pllrildqg82dfnc08de7hoabr1tlsa5q.apps.googleusercontent.com">

  <React.StrictMode>
    <Router>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
    </Router>
  </React.StrictMode>,
  </GoogleOAuthProvider>
);
