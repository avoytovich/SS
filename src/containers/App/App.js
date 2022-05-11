import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';

import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Footer from '../../components/Footer';
import ErrorFallback from '../../components/ErrorFallback';
import Header from '../../components/Common/Header';
import AppRouter from '../../routers/AppRouter';

import '../../assets/fonts/Ubuntu-Light.ttf';
import '../../assets/fonts/Ubuntu-Regular.ttf';
import '../../assets/fonts/Ubuntu-Medium.ttf';

import './App.css';

export default function App() {
  const isAuthenticated = useSelector(state => state.auth.token);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router basename={window.BASEPATH}>
        {isAuthenticated && <Header />}
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <AppRouter />
          <Footer />
        </Container>
      </Router>
    </ErrorBoundary>
  );
}
