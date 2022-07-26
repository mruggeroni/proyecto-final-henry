import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/store/index.js';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import claves from "./privado";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={process.env.DOMAIN || claves.DOMAIN}
      clientId={process.env.CLIENTID ||claves.CLIENTID}
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
