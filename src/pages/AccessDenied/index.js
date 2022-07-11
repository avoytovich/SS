import * as React from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

import {ButtonContained} from 'components/Button';
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
          <ButtonContained key="back-btn" data-testid="back-btn" onClick={goBack}>
            Go Back
          </ButtonContained>
        </Box>
      </Box>
    </PagePanel>
  );
};

export default AccessDenied;
