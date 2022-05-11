import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {CapgeminiLogo} from '../../icons';
import {CompanyUrl} from '../../../constants/common';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      sx={{flex: 0, display: 'flex', flexDirection: 'row', marginBottom: 2, textAlign: 'left'}}
      component="footer"
    >
      {process.env}
      {window.location.hostname !== 'localhost' && (
        <Box marginBottom={1}>
          <Typography variant="caption" component="p" gutterBottom>
            Pipeline:{' '}
            <a href={window.PIPELINE_LINK} target="_blank" rel="noreferrer">
              {window.COMMIT}
            </a>
          </Typography>
          {window.BRANCH !== 'master' && (
            <Typography variant="caption" component="p" gutterBottom>
              Branch:{' '}
              <a href={window.BRANCH_LINK} target="_blank" rel="noreferrer">
                {window.BRANCH}
              </a>
            </Typography>
          )}
        </Box>
      )}
      <Box
        sx={{
          display: 'inline-flex',
          alignSelf: 'flex-end',
          lineHeight: '27px',
          marginLeft: 'auto',
          marginRight: 0
        }}
      >
        &copy;&nbsp;
        <a href={CompanyUrl} target="_blank" rel="noreferrer">
          <CapgeminiLogo sx={{fontSize: 180, height: '30px'}} />
        </a>
        &nbsp;{currentYear}
      </Box>
    </Box>
  );
};

export default Footer;
