import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';

// common MuiBox with CircularProgress styles should go here
const StyledMuiCircularBox = styled(MuiBox)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}));

const CircularLoader = () => (
  <StyledMuiCircularBox>
    <CircularProgress />
  </StyledMuiCircularBox>
);

export default CircularLoader;
