import * as React from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import ErrorFallback from '../../components/ErrorFallback';
import AppRouter from '../../routers/AppRouter';
import MainContainer from '../../components/Common/MainContainer';

import '../../assets/fonts/Ubuntu-Light.ttf';
import '../../assets/fonts/Ubuntu-Regular.ttf';
import '../../assets/fonts/Ubuntu-Medium.ttf';

import './App.css';

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router>
      <MainContainer>
        <AppRouter />
      </MainContainer>
    </Router>
  </ErrorBoundary>
);

export default App;
