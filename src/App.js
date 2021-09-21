import * as React from 'react';
import { Provider } from 'react-redux';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import {
  BrowserRouter as Router, Route, Switch, NavLink as RouterLink,
} from 'react-router-dom';
import { store } from './store';
import Welcome from './pages/Welcome';

import './App.css';

export default function App() {
  return (
      <Provider store={store}>
        <Router>
          <AppBar position="static">
            <Toolbar variant="regular">
              <Link component={RouterLink} to="/" exact={true}>
                Welcome
              </Link>
              <Link component={RouterLink} to="/skills">
                Skills
              </Link>
              <Link component={RouterLink} to="/employees">
                Employees
              </Link>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/" exact={true}>
                <Welcome/>
              </Route>
            </Switch>
          </Container>
        </Router>
      </Provider>
  );
}
