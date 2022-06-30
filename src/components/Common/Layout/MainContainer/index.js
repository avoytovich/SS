import * as React from 'react';

import {useSelector} from 'react-redux';

import Container from '@mui/material/Container';
import {useIsAuthenticated} from '@azure/msal-react';
import Header from '../Header';
import Footer from '../../Footer';

import {useStyles} from './styles';

const MainContainer = ({children}) => {
  const isAuthenticated = useSelector(state => state.auth.token);

  const isAuthenticated1 = useIsAuthenticated();

  const classes = useStyles();

  return (
    <div className={classes.contentWrapper} data-testid="main-content-wrapper">
      {isAuthenticated && <Header />}
      {isAuthenticated1 && 'isAuthenticated_1'}
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default MainContainer;
