import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store/index.js';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import claves from "./privado"

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={claves.DOMAIN}
      clientId={claves.CLIENTID}
      // redirectUri={window.location.origin}
      redirectUri={"http://localhost:3000"}
      audiencie="identificador unico" //deberia de ser privado -> lo usamos en las rutas tmb
      audience="identificador unico"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </Provider>,
  document.getElementById('root')
);
