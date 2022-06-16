import React from 'react';
import PropTypes from 'prop-types';
import {SnackbarProvider} from 'notistack';
import useStyles from './styles';

const SnackbarProviderWrapper = ({children}) => {
  const classes = useStyles();
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      autoHideDuration={3000}
      variant="success"
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

SnackbarProviderWrapper.propTypes = {
  children: PropTypes.node
};

export default SnackbarProviderWrapper;
