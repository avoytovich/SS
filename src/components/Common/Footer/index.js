import React from 'react';
import {Box, Typography} from '@mui/material';

import {CompanyUrl} from 'constants/common';
import image from 'assets/images/Capgemini.svg';

import FooterBox, {BoxStyled} from './Footer.styles';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterBox component="footer">
      {process.env.NODE_ENV === 'development' && (
        <Box marginBottom={1}>
          <Typography variant="caption" component="p" gutterBottom>
            Pipeline:{' '}
            <a href={window.PIPELINE_LINK} target="_blank" rel="noreferrer">
              {window.COMMIT}
            </a>
          </Typography>
          <Typography variant="caption" component="p" gutterBottom>
            Branch:{' '}
            <a href={window.BRANCH_LINK} target="_blank" rel="noreferrer">
              {window.BRANCH}
            </a>
          </Typography>
        </Box>
      )}
      <BoxStyled>
        &copy;&nbsp;
        <a href={CompanyUrl} target="_blank" rel="noreferrer">
          <img src={image} alt="Capgemini Logo" />
        </a>
        &nbsp;{currentYear}
      </BoxStyled>
    </FooterBox>
  );
};

export default Footer;
