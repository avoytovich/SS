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
import NeighborsList from './pages/NeighborsList';
import EmployeesList from './pages/EmployeesList';

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
              <Link component={RouterLink} to="/skills" exact={true}>
                Skills
              </Link>
              <Link component={RouterLink} to="/employees">
                Employees
              </Link>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
            <Switch>
              <Route path="/" exact={true} component={Welcome} />
              <Route path="/skills/:name">
                <NeighborsList />
              </Route>
              <Route path="/employees">
                <EmployeesList />
              </Route>
            </Switch>
          </Container>
        </Router>
      </Provider>
  );
}
