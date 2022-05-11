import * as React from 'react';

import {useSelector} from 'react-redux';

import Container from '@mui/material/Container';
import Header from '../Header';
import Footer from '../Footer';

const MainContainer = ({children}) => {
  const isAuthenticated = useSelector(state => state.auth.token);
  return (
    <>
      {isAuthenticated && <Header />}
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
    </>
  );
};

export default MainContainer;
