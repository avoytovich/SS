import * as React from 'react';
import {useHistory} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {Box, Button} from '@mui/material';
import PageLayout from 'components/Common/Layout/PageLayout';
import image from 'assets/images/NotFound.svg';

import {useStyles} from 'pages/styles';

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
    </PageLayout>
  );
};

export default NotFound;
