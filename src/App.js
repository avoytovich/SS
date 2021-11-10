import * as React from 'react';
import { Provider } from 'react-redux';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Route, Switch, NavLink as RouterLink } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './store';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NeighborsList from './pages/NeighborsList';
import SkillsRegistry from './pages/SkillsRegistry';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import Footer from './components/Footer';
import ErrorFallback from './components/ErrorFallback';

import './fonts/Ubuntu-Light.ttf';
import './fonts/Ubuntu-Regular.ttf';
import './fonts/Ubuntu-Medium.ttf';
import './App.css';

const isActiveFn = path => (match, location) => location.pathname.startsWith(path);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <Router basename={window.BASEPATH}>
          <AppBar position="static">
            <Toolbar variant="regular">
              <Link component={RouterLink} to="/" exact={true}>
                Welcome
              </Link>
              <Link
                component={RouterLink}
                to="/skills"
                exact={true}
                isActive={isActiveFn('/skills')}
              >
                Skills
              </Link>
              <Link component={RouterLink} to="/employees" isActive={isActiveFn('/employees')}>
                Employees
              </Link>
            </Toolbar>
          </AppBar>
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}
          >
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/skills" exact={true} component={SkillsRegistry} />
              <Route path="/skills/:name" exact={true} component={NeighborsList} />
              <Route path="/employees" exact={true} component={EmployeeList} />
              <Route path="/employees/:employeeId" exact={true} component={EmployeeDetails} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Container>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}
