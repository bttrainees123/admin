import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from './store';
import "./components/LanguageChanger/i18n";
// import { ReactKeycloakProvider } from '@react-keycloak/web'
// import keycloak from './components/keycloak/keycloak'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    {/* <ReactKeycloakProvider authClient={keycloak}> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </ReactKeycloakProvider> */}
  </React.StrictMode>
);

reportWebVitals();
