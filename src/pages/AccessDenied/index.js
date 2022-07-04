import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Button, Typography} from '@mui/material';

import HelmetWrapper from 'containers/HelmetWrapper';
import {PagePanel} from 'components/PagePanel';
import image from 'assets/images/AccessDenied.svg';

import {useStyles} from 'pages/styles';

const AccessDenied = () => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <PagePanel>
      <HelmetWrapper title="Access denied" includeAppName={false} />
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
          <Button
            key="back-btn"
            className={classes.backButton}
            variant="contained"
            data-testid="back-btn"
            onClick={goBack}
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </PagePanel>
  );
};

export default AccessDenied;