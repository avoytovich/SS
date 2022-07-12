import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {HelmetProvider} from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';

import App from 'containers/App/App';
import themeConfig from 'theme/themeConfig';
import {persistor, store} from 'store/store';
import {MsalProvider} from 'containers/MsalProvider';
import SnackbarProviderWrapper from 'containers/SnackbarProviderWrapper';

import {MSAL_CONFIG} from './constants/msalConfig-config';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ThemeProvider theme={themeConfig}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <SnackbarProviderWrapper>
            <MsalProvider config={MSAL_CONFIG}>
              <CssBaseline />
              <App />
            </MsalProvider>
          </SnackbarProviderWrapper>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </ThemeProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
