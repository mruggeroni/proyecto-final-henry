import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store/index.js';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-v3irw8ok.us.auth0.com"
      clientId="tDpnPwy2B90ppG0LR2pNEk0WbKOPVAwM"
      // redirectUri={window.location.origin}
      redirectUri={"http://localhost:3000/login"}
      audiencie="identificador unico" //deberia de ser privado -> lo usamos en las rutas tmb
      audience="identificador unico"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
