import * as React from 'react';
import {useHistory} from 'react-router-dom';

import useStyles from 'pages/styles';

import PageLayout from 'components/Common/Layout/PageLayout';

import {Box, Typography} from '@mui/material';

import {ButtonContained} from 'components/Button';

import image from 'assets/images/AccessDenied.svg';

const AccessDenied = () => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <PageLayout pageTitle="Access denied" includeAppName={false}>
      <Box
        className={`${classes.centerContent} ${classes.flexColumn}`}
        data-testid="access-denied-content"
      >
        <img src={image} alt="Access denied" />
        <Box className={`${classes.centerContent} ${classes.flexColumn}`} mt={4}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Access denied
          </Typography>
          <Typography variant="body1" color="gray" mb={2} gutterBottom>
            You do not have permitions to visit this page
          </Typography>
          <ButtonContained key="back-btn" data-testid="back-btn" onClick={goBack}>
            Go Back
          </ButtonContained>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AccessDenied;
