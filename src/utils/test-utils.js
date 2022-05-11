import React from 'react';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter} from 'react-router-dom';
import {render} from '@testing-library/react';
import {ThemeProvider} from '@mui/material/styles';
import themeConfig from 'theme/themeConfig';
import {store} from 'store/store';

const AllTheProviders = ({children}) => (
  <ThemeProvider theme={themeConfig}>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </HelmetProvider>
    </Provider>
  </ThemeProvider>
);

const customRender = (ui, options) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};
