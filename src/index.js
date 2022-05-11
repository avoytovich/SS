import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './containers/App/App';
import themeConfig from './theme/themeConfig';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store/store';

ReactDOM.render(
  <ThemeProvider theme={themeConfig}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <CssBaseline />
          <App />
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
