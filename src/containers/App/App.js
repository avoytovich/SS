import * as React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Route, Switch, NavLink as RouterLink } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Login from '../../pages/Login';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import NeighborsList from '../../pages/NeighborsList';
import SkillsRegistry from '../../pages/SkillsRegistry';
import EmployeeList from '../../pages/EmployeeList';
import EmployeeDetails from '../../pages/EmployeeDetails';
import Footer from '../../components/Footer';
import ErrorFallback from '../../components/ErrorFallback';

import PublicRoute from '../../routes/PublicRoute';
import PrivateRoute from '../../routes/PrivateRoute';

import '../../assets/fonts/Ubuntu-Light.ttf';
import '../../assets/fonts/Ubuntu-Regular.ttf';
import '../../assets/fonts/Ubuntu-Medium.ttf';
import './App.css';
import UserMenu from '../../components/UserMenu';

const isActiveFn = path => (match, location) => location.pathname.startsWith(path);

export default function App() {
  const isAuthenticated = useSelector(state => state.auth.token);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router basename={window.BASEPATH}>
        {isAuthenticated && (
          <AppBar position="static">
            <Toolbar>
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
              <UserMenu />
            </Toolbar>
          </AppBar>
        )}
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Switch>
            <PublicRoute path={['/', '/login']} exact={true}>
              <Login />
            </PublicRoute>
            <PrivateRoute path="/home" exact={true}>
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/skills" exact={true}>
              <SkillsRegistry />
            </PrivateRoute>
            <PrivateRoute path="/skills/:name" exact={true}>
              <NeighborsList />
            </PrivateRoute>
            <PrivateRoute path="/employees" exact={true}>
              <EmployeeList />
            </PrivateRoute>
            <PrivateRoute path="/employees/:employeeId" exact={true}>
              <EmployeeDetails />
            </PrivateRoute>
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Container>
      </Router>
    </ErrorBoundary>
  );
}
