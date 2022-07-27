import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store/index.js';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
// import claves from "./privado";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

const DOMAIN = process.env.REACT_APP_DOMAIN || 'dev-v3irw8ok.us.auth0.com';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || 'tDpnPwy2B90ppG0LR2pNEk0WbKOPVAwM';
ReactDOM.render(
  <Provider store={store}> 
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
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
