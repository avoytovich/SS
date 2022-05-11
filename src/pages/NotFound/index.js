import * as React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import PageTitle from '../../components/PageTitle';
import {Logo} from '../../components/icons';
import {PagePanel} from '../../components/PagePanel';

import {useStyles} from '../styles';

const NotFound = () => {
  const classes = useStyles();
  return (
    <PagePanel>
      <PageTitle title="Page Not Found" includeAppName={false} />
      <Box className={`${classes.centerContent} ${classes.flexColumn}`}>
        <Logo sx={{fontSize: 120}} className={classes.centerContent} />
        <Typography variant="h4" component="h1" gutterBottom>
          404 Page Not Found
        </Typography>
        <Link component={RouterLink} underline="hover" to={'/'}>
          <Typography textAlign="center">Go Home</Typography>
        </Link>
      </Box>
    </PagePanel>
  );
};

export default NotFound;
