import * as React from 'react';
import {useHistory} from 'react-router-dom';

import {Box, Typography} from '@mui/material';

// TODO Refactor it. Add styles to separate components and remove pages/styles.js
import useStyles from 'pages/styles';

import PageLayout from 'components/Common/Layout/PageLayout';
import {ButtonContained} from 'components/Button';

import image from 'assets/images/NotFound.svg';

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <PageLayout pageTitle="Page Not Found" includeAppName={false}>
      <Box
        className={`${classes.centerContent} ${classes.flexColumn}`}
        data-testid="not-found-content"
      >
        <img src={image} alt="Page Not Found" />
        <Box
          className={`${classes.centerContent} ${classes.flexColumn}`}
          sx={{width: '270px'}}
          mt={4}
        >
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Not Found
          </Typography>
          <Typography variant="body1" color="gray" align="center" mb={2} gutterBottom>
            The page you are looking for doesn&#39;t exist or has been moved.
          </Typography>
          <ButtonContained key="back-btn" data-testid="back-btn" onClick={goBack}>
            Go Back
          </ButtonContained>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default NotFound;
