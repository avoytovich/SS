import * as React from 'react';
import PropTypes from 'prop-types';

import {useSelector} from 'react-redux';

import Container from '@mui/material/Container';
import Header from '../Header';
import Footer from '../../Footer';

import {useStyles} from './styles';
import PageHeader from '../PageHeader';

const PageLayout = ({title, children}) => {
  const {isAuthenticated} = useSelector(state => state.auth);

  const classes = useStyles();

  return (
    <div className={classes.contentWrapper} data-testid="main-content-wrapper">
      {isAuthenticated && <Header />}
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        {title && <PageHeader title={title} />}
        {children}
      </Container>
      <Footer />
    </div>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string
};

PageLayout.defaultProps = {
  title: ''
};

export default PageLayout;
