import * as React from 'react';
import { Provider } from 'react-redux';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter as Router, Route, Switch, NavLink as RouterLink,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './store';
import Welcome from './pages/Welcome';
import NeighborsList from './pages/NeighborsList';
import SkillsRegistry from './pages/SkillsRegistry';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';

import './fonts/Ubuntu-Light.ttf';
import './fonts/Ubuntu-Regular.ttf';
import './fonts/Ubuntu-Medium.ttf';
import './App.css';
import ErrorFallback from './components/ErrorFallback';

const isActiveFn = path => (match, location) => location.pathname.startsWith(path);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Router>
          <AppBar position="static">
            <Toolbar variant="regular">
              <Link component={RouterLink} to="/" exact={true}>
                Welcome
              </Link>
              <Link component={RouterLink} to="/skills" exact={true} isActive={isActiveFn('/skills')}>
                Skills
              </Link>
              <Link component={RouterLink} to="/employees" isActive={isActiveFn('/employees')}>
                Employees
              </Link>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
            <Switch>
              <Route path="/" exact={true} component={Welcome} />
              <Route path="/skills" exact={true} component={SkillsRegistry} />
              <Route path="/skills/:name" exact={true}>
                <NeighborsList />
              </Route>
              <Route path="/employees" exact={true}>
                <EmployeeList />
              </Route>
              <Route path="/employees/:employeeId" exact={true}>
                <EmployeeDetails />
              </Route>
            </Switch>
            <Box sx={{ flex: 0 }} textAlign="left" component="footer">
              {window.location.hostname !== 'localhost'
                && <>
                  <Typography variant="caption" component="p" gutterBottom>
                    Pipeline: <a href={window.PIPELINE_LINK} target="_blank" rel="noreferrer">
                      {window.COMMIT}
                    </a>
                  </Typography>
                  {window.BRANCH !== 'master'
                    && <Typography variant="caption" component="p" gutterBottom>
                      Branch: {window.BRANCH}
                    </Typography>}
                </>}
            </Box>
          </Container>
        </Router>
      </Provider>
      </ErrorBoundary>
  );
}
