import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';

// common MuiBox with CircularProgress styles should go here
const StyledMuiCircularBox = styled(MuiBox)(() => ({
  display: 'flex',
  position: 'fixed',
  left: 0,
  background: 'rgba(255,255,255,0.9)',
  width: '100%',
  height: '100%',
  top: 0,
  alignItems: 'center',
  justifyContent: 'center'
}));

const PageLoader = () => (
  <StyledMuiCircularBox>
    <CircularProgress />
  </StyledMuiCircularBox>
);

export default PageLoader;
